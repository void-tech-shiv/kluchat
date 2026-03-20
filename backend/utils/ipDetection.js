const getClientIpFromSocket = (socket) => {
  const forwardedFor = socket.handshake.headers['x-forwarded-for'];
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  return socket.handshake.address || socket.conn.remoteAddress || 'unknown';
};

const getRoomIdFromIp = (ip) => {
  if (ip === 'unknown') return 'global';
  // Replace dots or colons with dashes to create a valid room name string
  return `room-${ip.replace(/[.:]/g, '-')}`;
};

module.exports = {
  getClientIpFromSocket,
  getRoomIdFromIp
};
