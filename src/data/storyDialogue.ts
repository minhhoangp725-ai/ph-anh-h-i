import { PhoOrder } from '../types/game';

export interface DayCustomerFlow {
  order: PhoOrder;
  characterId: string;
  beforeDialogue: { speaker: string; text: string }[];
  chemistryQuestionId?: string;
  afterDialogue: { speaker: string; text: string }[];
}

export const DAY1_CUSTOMERS: DayCustomerFlow[] = [
  {
    characterId: 'khoa',
    order: {
      id: 'd1_khoa',
      customerName: 'Khoa (Grab)',
      meat: 'tai',
      scallion: 'yes',
      sides: ['quay'],
      note: '1 Bát Phở Tái đầy đủ hành + 1 dĩa quẩy giòn',
      totalPrice: 200000, // Generous opening day payment to reach 1 million target
      givenCash: 500000,
      expectedChange: 300000
    },
    beforeDialogue: [
      { speaker: 'Khoa (Grab)', text: 'Chào anh Hải! Em giao đơn Grab ngang qua thấy quán mới mở, làm bát phở tái nhiều hành với dĩa quẩy nạp năng lượng nào!' },
      { speaker: 'Hải', text: 'Có ngay chú em! Bánh phở gia truyền thơm nức mũi đây.' }
    ],
    chemistryQuestionId: 'q_mol_khoa',
    afterDialogue: [
      { speaker: 'Khoa (Grab)', text: 'Nước phở tuyệt hảo, mật mã đồng chí giải rất chuẩn! Động Thiên Đường gần đây hoạt động rất đáng ngờ, chú ý nhé!' },
      { speaker: 'Hải', text: 'Đã rõ! Cảm ơn chú em!' }
    ]
  },
  {
    characterId: 'khanh',
    order: {
      id: 'd1_khanh',
      customerName: 'Khánh (Bé Xe Lăn)',
      meat: 'chin',
      scallion: 'no',
      sides: ['com'],
      note: '1 Bát Phở Bò Chín Nạm - TUYỆT ĐỐI KHÔNG BỎ HÀNH + 1 Bát Cơm Trắng',
      totalPrice: 200000,
      givenCash: 500000,
      expectedChange: 300000
    },
    beforeDialogue: [
      { speaker: 'Khánh (Bé Xe Lăn)', text: 'Chào chú Hải! Chú làm cho cháu bát phở bò chín nhé. Nhớ là KHÔNG ĐƯỢC CHO HÀNH đâu đấy, cháu dị ứng hành lá!' },
      { speaker: 'Hải', text: 'Yên tâm, chú nhớ rồi, phở chín sạch bóng không một cọng hành lá!' }
    ],
    chemistryQuestionId: 'q_vol_khanh',
    afterDialogue: [
      { speaker: 'Khánh (Bé Xe Lăn)', text: 'Phở ngon quá chú ơi! Phong bì mật thư cháu đã nhét dưới đáy dĩa, chú cất cẩn thận nhé.' },
      { speaker: 'Hải', text: 'Cảm ơn cháu bé thông minh!' }
    ]
  },
  {
    characterId: 'trai_bach_khoa',
    order: {
      id: 'd1_bachkhoa',
      customerName: 'Trai Bách Khoa',
      meat: 'tai',
      scallion: 'yes',
      sides: [],
      note: '1 Bát Phở Tái nhiều hành tươi nguyên chất',
      totalPrice: 200000,
      givenCash: 500000,
      expectedChange: 300000
    },
    beforeDialogue: [
      { speaker: 'Trai Bách Khoa', text: 'Khai trương quán mới à sư huynh! Em vừa cày xong bộ anime Solo Leveling đói lả, cho em bát phở bò tái đậm đà!' },
      { speaker: 'Hải', text: 'Có ngay cho vị lữ khách đam mê anime!' }
    ],
    chemistryQuestionId: 'q_density_bachkhoa',
    afterDialogue: [
      { speaker: 'Trai Bách Khoa', text: 'Nước dùng này đạt chuẩn tỉ lệ phân tử vàng! Em sẽ chấm quán này 10/10 trên các hội nhóm manga!' },
      { speaker: 'Hải', text: 'Cảm ơn em trai nhiều nha.' }
    ]
  },
  {
    characterId: 'gia_bao',
    order: {
      id: 'd1_giabao',
      customerName: 'Gia Bảo (Runner)',
      meat: 'chin',
      scallion: 'no',
      sides: ['quay'],
      note: '1 Bát Phở Chín - KHÔNG HÀNH + 1 dĩa quẩy',
      totalPrice: 200000,
      givenCash: 500000,
      expectedChange: 300000
    },
    beforeDialogue: [
      { speaker: 'Gia Bảo (Runner)', text: 'Phù phù... Em vừa chạy 10km quanh làng! Cho em bát phở chín không hành thêm quẩy nạp đạm nào anh ơi!' },
      { speaker: 'Hải', text: 'Khách thể thao ăn phở là chuẩn bài, đợi anh 1 phút nhé!' }
    ],
    chemistryQuestionId: 'q_cpercent_broth',
    afterDialogue: [
      { speaker: 'Gia Bảo (Runner)', text: 'Ngon tuyệt cú mèo! Làng mình dạo này có vẻ nhiều tay xe lạ lượn lờ lắm, anh mới mở quán nhớ cẩn thận đấy.' },
      { speaker: 'Hải', text: 'Cảm ơn em đã dặn dò.' }
    ]
  },
  {
    characterId: 'hieu',
    order: {
      id: 'd1_hieu',
      customerName: 'Trưởng Làng Hiệu',
      meat: 'tai',
      scallion: 'yes',
      sides: ['quay'],
      note: '1 Bát Phở Tái Thượng Hạng + Quẩy giòn',
      totalPrice: 200000,
      givenCash: 500000,
      expectedChange: 300000
    },
    beforeDialogue: [
      { speaker: 'Trưởng Làng Hiệu', text: 'Ha ha! Chào cậu Hải, tôi là Hiệu - Trưởng làng đây! Nghe nói làng ta có quán phở mới mở nên tôi ghé thẩm vị và chúc mừng!' },
      { speaker: 'Hải', text: 'Ôi vinh hạnh cho quán cháu quá! Mời bác ngồi, cháu làm ngay bát phở tái nóng hổi kính bác!' }
    ],
    afterDialogue: [
      { speaker: 'Trưởng Làng Hiệu', text: 'Chà! Nước phở thanh ngọt, bò mềm... Cậu làm ăn phát đạt thế này chắc gom được khối tiền ấy nhỉ? Ở làng này buôn bán phải biết điều nghe chưa!' },
      { speaker: 'Hải', text: 'Dạ, cháu chỉ kiếm đồng ra đồng vào lương thiện thôi bác ạ.' }
    ]
  }
];

export const DAY2_CUSTOMERS: DayCustomerFlow[] = [
  {
    characterId: 'man_dan',
    order: {
      id: 'd2_mandan',
      customerName: 'Mân Đàn (Fan Bóng Đá)',
      meat: 'tai',
      scallion: 'yes',
      sides: ['quay'],
      note: '1 Bát Phở Tái rực lửa như siêu phẩm sút xa + Quẩy',
      totalPrice: 150000,
      givenCash: 200000,
      expectedChange: 50000
    },
    beforeDialogue: [
      { speaker: 'Mân Đàn (Fan Bóng Đá)', text: 'SIUUUU! Hôm qua đội nhà vừa thắng kịch tính phút 90! Em nghe nói quán anh Hải ngon số một, cho em bát phở tái tiếp lửa đam mê nào!' },
      { speaker: 'Hải', text: 'Chào fan bóng đá cuồng nhiệt! Ăn phở này xong sút bóng lủng lưới luôn nhé!' }
    ],
    chemistryQuestionId: 'q_mol_mandan',
    afterDialogue: [
      { speaker: 'Mân Đàn (Fan Bóng Đá)', text: 'Đỉnh nóc kịch trần! Anh chủ vừa nấu phở ngon vừa rành hóa học thế này thì ai đọ lại!' },
      { speaker: 'Hải', text: 'Cảm ơn chú em, nhớ ghé ủng hộ quán thường xuyên nhé!' }
    ]
  },
  {
    characterId: 'trai_bach_khoa',
    order: {
      id: 'd2_bachkhoa',
      customerName: 'Trai Bách Khoa',
      meat: 'none',
      scallion: 'yes',
      sides: ['com'],
      note: '1 Bát Phở Không Người Lái (không thịt) + Bát cơm',
      totalPrice: 100000,
      givenCash: 200000,
      expectedChange: 100000
    },
    beforeDialogue: [
      { speaker: 'Trai Bách Khoa', text: 'Hôm nay cuối tháng ví hơi mỏng, anh Hải cho em bát "Phở không người lái" chan nước dùng ngọt lịm với bát cơm trắng nhé!' },
      { speaker: 'Hải', text: 'Phở không người lái mà nước xương ninh chuẩn thì vẫn ngon đỉnh chóp nha em!' }
    ],
    chemistryQuestionId: 'q_cm_salt',
    afterDialogue: [
      { speaker: 'Trai Bách Khoa', text: 'Ngon bất ngờ! Nước dùng này đúng là tinh hoa ẩm thực!' },
      { speaker: 'Hải', text: 'No bụng để tiếp tục học tập nghiên cứu nhé em trai!' }
    ]
  }
];
