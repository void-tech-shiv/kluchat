const redis = require('./redis');
const { getClientIpFromSocket, getRoomIdFromIp } = require('./ipDetection');
const { filterProfanity } = require('./security');

// Temporary message TTL: 1 hour = 3600 seconds
const MESSAGE_TTL = 3600; 

const handleSockets = (io) => {
  io.on('connection', async (socket) => {
    // Determine the user's IP and corresponding room
    const ip = getClientIpFromSocket(socket);
    const roomId = getRoomIdFromIp(ip);
    
    // Join the automatically assigned room based on IP
    socket.join(roomId);

    // Join Chat and set username
    socket.on('join_chat', async ({ username }) => {
      socket.username = username || 'Anonymous';
      
      // Store user presence in a Redis Set
      await redis.sadd(`room:${roomId}:users`, socket.username);
      
      // Notify the room someone joined
      io.to(roomId).emit('user_joined', {
        username: socket.username,
        message: `${socket.username} has joined the chat`
      });

      // Fetch active users in the room
      const users = await redis.smembers(`room:${roomId}:users`);
      io.to(roomId).emit('update_users', users);

      // Fetch chat history from Redis List
      const historyStrings = await redis.lrange(`room:${roomId}:messages`, 0, -1);
      const history = historyStrings.map(msg => JSON.parse(msg));
      socket.emit('chat_history', history);
    });

    // Handle incoming messages
    socket.on('send_message', async (data) => {
      const { text } = data;
      if (!text || text.trim() === '') return;
      
      const filteredText = filterProfanity(text);

      const message = {
        id: Date.now().toString(),
        username: socket.username,
        text: filteredText,
        timestamp: new Date().toISOString()
      };

      // Push message to Redis list
      await redis.rpush(`room:${roomId}:messages`, JSON.stringify(message));
      
      // Reset expiry whenever a new message is added
      await redis.expire(`room:${roomId}:messages`, MESSAGE_TTL);

      // Broadcast message to room
      io.to(roomId).emit('receive_message', message);
    });

    // Handle typing indicators
    socket.on('typing', (isTyping) => {
      socket.to(roomId).emit('user_typing', {
        username: socket.username,
        isTyping
      });
    });

    // Handle user disconnect
    socket.on('disconnect', async () => {
      if (socket.username) {
        // Remove user presence
        await redis.srem(`room:${roomId}:users`, socket.username);
        
        io.to(roomId).emit('user_left', {
          username: socket.username,
          message: `${socket.username} has left the chat`
        });

        // Update active users
        const users = await redis.smembers(`room:${roomId}:users`);
        io.to(roomId).emit('update_users', users);
      }
    });
  });
};

module.exports = handleSockets;
