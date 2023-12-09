const { authenticate } = require('../auth/authService');

function handleAuthentication(socket, data) {
  const { username, password } = parseAuthenticationData(data);

  // Sử dụng hàm authenticate đồng bộ để kiểm tra thông tin đăng nhập
  const isAuthenticated = authenticate(username, password);

  // Phản hồi lại client dựa trên kết quả xác thực
  if (isAuthenticated) {
    // Nếu xác thực thành công
    socket.write('Authentication successful');
    // Tiếp tục với các bước tiếp theo...
  } else {
    // Nếu xác thực thất bại
    socket.write('Authentication failed');
    socket.end(); // Kết thúc kết nối sau khi xác thực thất bại
  }
}

function parseAuthenticationData(data) {
  // Giả sử dữ liệu được gửi dưới dạng chuỗi JSON
  try {
    const credentials = JSON.parse(data.toString());
    return {
      username: credentials.username,
      password: credentials.password,
    };
  } catch (error) {
    // Xử lý lỗi khi không phân tích được dữ liệu và trả về giá trị mặc định
    return { username: null, password: null };
  }
}

module.exports = { handleAuthentication };