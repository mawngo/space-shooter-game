# Luật chơi

Note: đối với người dùng window, bạn cần chạy câu lệnh sau trên PowerShell với quyền admin
```shell
CheckNetIsolation.exe LoopbackExempt -a -n="Microsoft.Win32WebViewHost_cw5n1h2txyewy"
```
Command này cho phép Edge đọc file trên local host (App này dùng edge làm backend trên window)

## 1. Điều Khiển

- Di chuyển bằng phím mũi tên
- S để bắn đạn đểu:
    - Có thể bắn tùy thích
    - Đạn đểu có 60% phá hủy thiên thạch :))
    - Nảy lại khi va chạm
    - Va chạm với đạn đểu sẽ mất máu và điểm
    - Tuân theo các định luật vật lý :))
- A để bắn đạn xịn vừa nhặt được:
    - Số lượng có hạn
    - Effect phụ thuộc vào loại đạn
    - Có 100% tỷ lệ bắn vỡ thiên thạch

## 2. Item

- Burger - Hồi máu
- Tiền - cộng điểm điểm
- 1 viên đạn (đạn đỏ) - 100 % phá hủy thiên thạch, nảy lại khi chạm tường, và hồi máu khi va chạm với người chơi
- 3 viên đạn (đạn xanh) - đạn bắn ra 100% phá hủy thiên thạch, không nảy lại khi chạm tường
- Vòng xoáy (đạn vòng tròn) - Xóa toàn bộ thiên thạch và đạn đang tồn tại

## 3. Thiên thạch

- Sinh ra từ hành tinh trung tâm, số lượng tăng theo thời gian.
- Va chạm với thiên thạch khiến nó bị phá hủy, và gây sát thương lên người chơi
- Thiên thạch có thể vỡ thành nhiều thiên thạch con, Sát thương và điểm số phụ thuộc vào kích thước của thiên thạch
- Thiên thạch nảy lại khi va chạm, và tuân theo định luật vật lý :D
