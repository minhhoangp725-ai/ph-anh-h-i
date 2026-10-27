import { CharacterInfo } from '../types/game';

export const CHARACTERS: Record<string, CharacterInfo> = {
  hai: {
    id: 'hai',
    name: 'Hải (Chủ Quán / Công An Chìm)',
    role: 'Chiến sĩ Công an chìm giả làm chủ quán phở',
    avatarColor: 'bg-emerald-600',
    description: 'Nấu phở siêu ngon, võ thuật cao cường, luôn mang theo người bạn trung thành Cậu Vàng.'
  },
  cau_vang: {
    id: 'cau_vang',
    name: 'Cậu Vàng',
    role: 'Người bạn đồng hành 4 chân',
    avatarColor: 'bg-amber-500',
    description: 'Chú chó lông vàng thông minh, lanh lợi, dũng cảm và cực kỳ trung thành.'
  },
  khoa: {
    id: 'khoa',
    name: 'Khoa (Tài Xế Grab)',
    role: 'Chiến sĩ Công an chìm đồng đội của Hải',
    avatarColor: 'bg-green-600',
    description: 'Giả dạng tài xế công nghệ Grab chạy xe khắp làng để nắm bắt tình hình và đưa mật lệnh.'
  },
  khanh: {
    id: 'khanh',
    name: 'Khánh (Cậu Bé Xe Lăn)',
    role: 'Trinh sát Công an chìm ngụy trang',
    avatarColor: 'bg-blue-600',
    description: 'Giả dạng cậu bé tật nguyền ngồi xe lăn, có óc quan sát sắc bén và chuyên gia mật mã.'
  },
  trai_bach_khoa: {
    id: 'trai_bach_khoa',
    name: 'Trai Bách Khoa',
    role: 'Khách hàng mê Anime / Khoa học',
    avatarColor: 'bg-indigo-600',
    description: 'Sinh viên Bách Khoa đam mê anime và hóa học, ăn phở phải có cảm hứng sáng tạo.'
  },
  man_dan: {
    id: 'man_dan',
    name: 'Mân Đàn',
    role: 'Khách hàng fan cuồng bóng đá',
    avatarColor: 'bg-red-600',
    description: 'Cổ động viên nhiệt thành, nói chuyện luôn gắn liền với tỉ số, sân cỏ và năng lượng bóng đá.'
  },
  gia_bao: {
    id: 'gia_bao',
    name: 'Gia Bảo',
    role: 'Người chạy bộ thể thao',
    avatarColor: 'bg-cyan-600',
    description: 'Vận động viên điền kinh phong trào, chạy bộ qua làng và là người đầu tiên cảnh báo về Phú Bà.'
  },
  hieu: {
    id: 'hieu',
    name: 'Trưởng Làng Hiệu',
    role: 'Kẻ cấu kết với tội phạm',
    avatarColor: 'bg-stone-600',
    description: 'Miệng nam mô bụng một bồ dao găm, ngoài mặt đạo mạo nhưng ngầm nhận tiền bảo kê động lắc.'
  },
  long: {
    id: 'long',
    name: 'Anh Long Bảo Kê',
    role: 'Đàn em đắc lực của Bà Trùm',
    avatarColor: 'bg-orange-700',
    description: 'Hung hãn, xăm trổ, chuyên đi đập phá, đòi tiền bảo kê các hàng quán trong làng.'
  },
  phu_ba: {
    id: 'phu_ba',
    name: 'Phú Bà',
    role: 'Bà trùm xã hội đen - Động Thiên Đường',
    avatarColor: 'bg-purple-700',
    description: 'Nữ quái cầm đầu đường dây trụy lạc và ma túy núp bóng quán bar DJ Thiên Đường.'
  }
};
