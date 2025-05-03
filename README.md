# Game bắn thiên thạch

[Play the Game](https://mawngo.github.io/space-shooter-game/) | [Read the Guide](https://mawngo.github.io/space-shooter-game/guide.html)

## Luật chơi

Một game ngu học.

### 1. Điều Khiển

- Di chuyển bằng phím mũi tên
- S hoặc chuột trái để bắn đạn đểu:
    - Có thể bắn tùy thích
    - Đạn đểu có 50% phá hủy thiên thạch :))
    - Nảy lại khi va chạm
    - Va chạm với đạn đểu sẽ mất máu và điểm
    - Tuân theo các định luật vật lý :))
- A hoặc chuột phải để bắn đạn xịn vừa nhặt được:
    - Số lượng có hạn
    - Effect phụ thuộc vào loại đạn
    - Có 100% tỷ lệ bắn vỡ thiên thạch
- Đối với màn hình cảm ứng:
    - Vuốt để đổi hướng
    - Chạm để bắn đạn đểu
    - Chạm bằng 2 ngón để bắn đạn xịn

### 2. Item

- Burger - Hồi máu
- Tiền - cộng điểm điểm
- 1 viên đạn (đạn đỏ) - 100 % phá hủy thiên thạch, nảy lại khi chạm tường, và hồi máu khi va chạm với người chơi
- 3 viên đạn (đạn xanh) - đạn bắn ra 100% phá hủy thiên thạch, không nảy lại khi chạm tường
- Vòng xoáy (đạn vòng tròn) - Xóa toàn bộ thiên thạch và đạn đang tồn tại

### 3. Thiên thạch

- Sinh ra từ hành tinh trung tâm, số lượng tăng theo thời gian.
- Va chạm với thiên thạch khiến nó bị phá hủy, và gây sát thương lên người chơi
- Thiên thạch có thể vỡ thành nhiều thiên thạch con, Sát thương và điểm số phụ thuộc vào kích thước của thiên thạch
- Thiên thạch nảy lại khi va chạm, và tuân theo định luật vật lý :D

## Sửa lỗi trắng màn hình trên Windows

Trên window neutralinojs sử dụng EdgeChromium để làm browser. Vì vậy, bạn
cần chạy command sau trên PowerShell (với quyền
admin):

```shell
CheckNetIsolation.exe LoopbackExempt -a -n="Microsoft.Win32WebViewHost_cw5n1h2txyewy"
```

Câu lệnh trên cho phép [neutralinojs](https://github.com/neutralinojs/neutralinojs) (và các ứng dụng UWP) truy cập vào
localhost trên Edge.

## Phát triển game này

### Clone Project

- clone project
- chạy command sau để download các file bin và thư viện của neutralino.js

```shell
npm run bin
```

### Chạy project

```shell
npm start
```

### Build Project

Câu lệnh sau sẽ đóng gói ứng dụng với tên `asteroids-release.zip` ra folder `dist`, và cập nhật `resources` files:

```shell
npm run build
```

### Versioning

Sửa version trong file `neutralino.config.js`
