import { ChemistryQuestion } from '../types/game';

export const CHEMISTRY_QUESTIONS: Record<string, ChemistryQuestion> = {
  q_mol_khoa: {
    id: 'q_mol_khoa',
    question: '[MẬT MÃ CÔNG AN] Đồng chí Khoa gửi tin: Để cân bằng kho gia vị nước dùng bí mật, cần dùng 5,6 gam khí Carbon monoxide (CO). Tính số mol của lượng khí CO này? (Cho C = 12, O = 16)',
    formulaHint: 'Công thức: n = m / M (với M_CO = 12 + 16 = 28 g/mol)',
    rewardCash: 50000,
    clueUnlock: 'Đầu mối số 1: Tọa độ điểm hẹn bí mật của băng đảng được giải mã (0,2 mol).',
    options: [
      {
        label: 'A',
        text: '0,2 mol',
        isCorrect: true,
        explanation: 'Chính xác! n = 5,6 / 28 = 0,2 mol. Mật mã công an đã được xác thực an toàn!'
      },
      {
        label: 'B',
        text: '0,5 mol',
        isCorrect: false,
        explanation: 'Sai rồi. M của CO là 28 g/mol, 5,6 / 28 = 0,2 mol.'
      },
      {
        label: 'C',
        text: '0,1 mol',
        isCorrect: false,
        explanation: 'Chưa chính xác.'
      },
      {
        label: 'D',
        text: '2,0 mol',
        isCorrect: false,
        explanation: 'Nhầm số thập phân rồi đồng chí ơi!'
      }
    ]
  },
  q_vol_khanh: {
    id: 'q_vol_khanh',
    question: '[MẬT THƯ XE LĂN] Bé Khánh chuyển phong bì: Ở điều kiện chuẩn (25°C, 1 bar theo SGK Kết Nối Tri Thức), thể tích của 0,5 mol khí Oxi (O2) chiếm bao nhiêu lít?',
    formulaHint: 'Theo SGK Kết Nối Tri Thức mới: V = n × 24,79 (lít) ở điều kiện chuẩn (đkc)',
    rewardCash: 60000,
    clueUnlock: 'Đầu mối số 2: Tần số bộ đàm đặc nhiệm 12,395 MHz.',
    options: [
      {
        label: 'A',
        text: '11,2 lít',
        isCorrect: false,
        explanation: '11,2 lít là chuẩn cũ (đktc 22,4L). Theo SGK Kết Nối Tri Thức mới, ở đkc 1 mol khí chiếm 24,79 lít!'
      },
      {
        label: 'B',
        text: '12,395 lít',
        isCorrect: true,
        explanation: 'Rất chuẩn! V = 0,5 × 24,79 = 12,395 lít. Khớp chính xác với chuẩn mới KNTT!'
      },
      {
        label: 'C',
        text: '24,79 lít',
        isCorrect: false,
        explanation: '24,79 lít là của 1 mol khí ở đkc.'
      },
      {
        label: 'D',
        text: '22,4 lít',
        isCorrect: false,
        explanation: '22,4 là chuẩn cũ năm xưa rồi nhé bạn ơi.'
      }
    ]
  },
  q_density_bachkhoa: {
    id: 'q_density_bachkhoa',
    question: '[TRAI BÁCH KHOA THỬ TÀI] "Anh Hải ơi, khói nghi ngút bốc lên từ nồi phở thơm quá! Anh có biết tỉ khối của khí Methane (CH4) so với không khí (M_kk ≈ 29) xấp xỉ bao nhiêu không?"',
    formulaHint: 'Công thức tỉ khối: d_(A/kk) = M_A / 29 (với M_CH4 = 12 + 4 = 16)',
    rewardCash: 40000,
    clueUnlock: 'Trai Bách Khoa vui mừng tip thêm tiền và để lại huy hiệu Waifu may mắn!',
    options: [
      {
        label: 'A',
        text: 'Xấp xỉ 0,55 (nhẹ hơn không khí)',
        isCorrect: true,
        explanation: 'Đúng 100%! d = 16 / 29 ≈ 0,55 < 1 nên khí CH4 nhẹ hơn không khí, bay lên trên!'
      },
      {
        label: 'B',
        text: 'Xấp xỉ 1,81 (nặng hơn không khí)',
        isCorrect: false,
        explanation: 'Sai rồi, 16 / 29 nhỏ hơn 1.'
      },
      {
        label: 'C',
        text: 'Bằng 1,00',
        isCorrect: false,
        explanation: 'CH4 có M=16, không khí là 29 nên không thể bằng 1.'
      },
      {
        label: 'D',
        text: 'Xấp xỉ 2,5',
        isCorrect: false,
        explanation: 'Không chính xác.'
      }
    ]
  },
  q_mol_mandan: {
    id: 'q_mol_mandan',
    question: '[MÂN ĐÀN HỎI XOÁY] "Tối qua đội em sút quả bóng bay vút vào góc chữ A như tên lửa! Nếu một bình khí N2 có khối lượng 14 gam thì số mol khí N2 trong đó là bao nhiêu hả anh chủ quán?" (Cho N = 14)',
    formulaHint: 'Khí Nitơ dạng phân tử N2, khối lượng mol M_N2 = 14 × 2 = 28 g/mol. n = m / M',
    rewardCash: 50000,
    clueUnlock: 'Mân Đàn hò reo ăn mừng bàn thắng và boa thêm 50k!',
    options: [
      {
        label: 'A',
        text: '1 mol',
        isCorrect: false,
        explanation: 'Lưu ý khí Nitơ là N2 (M = 28 g/mol), không phải nguyên tử N đơn lẻ!'
      },
      {
        label: 'B',
        text: '0,5 mol',
        isCorrect: true,
        explanation: 'Chuẩn không cần chỉnh! n = 14 / (14 × 2) = 14 / 28 = 0,5 mol!'
      },
      {
        label: 'C',
        text: '2 mol',
        isCorrect: false,
        explanation: 'Sai rồi.'
      },
      {
        label: 'D',
        text: '0,25 mol',
        isCorrect: false,
        explanation: '14 / 28 = 0,5 mol chứ không phải 0,25.'
      }
    ]
  },
  q_giabao_runner: {
    id: 'q_giabao_runner',
    question: '[GIA BẢO HỎI NHANH] "Em vừa chạy bộ 10km đốt cháy biết bao năng lượng! Khí Carbon dioxide (CO2) em thở ra có tỉ khối so với khí Oxi (O2) là bao nhiêu hả anh?" (Cho C=12, O=16)',
    formulaHint: 'M_CO2 = 12 + 16×2 = 44 g/mol; M_O2 = 16×2 = 32 g/mol. Tỉ khối d_(CO2/O2) = 44 / 32',
    rewardCash: 50000,
    clueUnlock: 'Gia Bảo tin tưởng Hải tuyệt đối và tiết lộ tin mật về động Thiên Đường!',
    options: [
      {
        label: 'A',
        text: '1,375 lần (CO2 nặng hơn O2)',
        isCorrect: true,
        explanation: 'Chính xác! d = 44 / 32 = 1,375. CO2 nặng hơn O2 nên thường lắng xuống vùng thấp.'
      },
      {
        label: 'B',
        text: '0,727 lần (CO2 nhẹ hơn O2)',
        isCorrect: false,
        explanation: 'Ngược tỉ số rồi em ơi!'
      },
      {
        label: 'C',
        text: '2,0 lần',
        isCorrect: false,
        explanation: '44 / 32 = 1,375.'
      },
      {
        label: 'D',
        text: '1,0 lần',
        isCorrect: false,
        explanation: 'Hai khí này khối lượng mol khác nhau.'
      }
    ]
  },
  q_cpercent_broth: {
    id: 'q_cpercent_broth',
    question: '[CÔNG THỨC NƯỚC PHỞ - NỒNG ĐỘ C%] "Hải hòa tan 20 gam muối gia vị thảo mộc vào 180 gam nước sôi để ninh nước cốt phở. Nồng độ phần trăm (C%) của dung dịch nước cốt này là bao nhiêu?"',
    formulaHint: 'C% = (m_ct / m_dd) × 100% (với m_dd = m_ct + m_H2O = 20 + 180 = 200 gam)',
    rewardCash: 60000,
    clueUnlock: 'Công thức nước cốt phở đạt độ tinh khiết lý tưởng, khám phá nồng độ chất cấm trong chuyên án!',
    options: [
      {
        label: 'A',
        text: '10%',
        isCorrect: true,
        explanation: 'Chính xác 100%! m_dd = 20 + 180 = 200 gam. C% = (20 / 200) × 100% = 10%!'
      },
      {
        label: 'B',
        text: '11,11%',
        isCorrect: false,
        explanation: 'Sai do lấy m_ct chia cho lượng nước (180g) thay vì chia cho tổng khối lượng dung dịch (200g)!'
      },
      {
        label: 'C',
        text: '20%',
        isCorrect: false,
        explanation: 'Chưa chính xác.'
      },
      {
        label: 'D',
        text: '5%',
        isCorrect: false,
        explanation: 'Sai rồi.'
      }
    ]
  },
  q_cm_salt: {
    id: 'q_cm_salt',
    question: '[NỒNG ĐỘ MOL C_M] "Trong phòng thí nghiệm điều tra, hòa tan hoàn toàn 0,4 mol chất tan NaCl vào nước thu được đúng 2 lít dung dịch. Nồng độ mol (C_M) của dung dịch NaCl là bao nhiêu?"',
    formulaHint: 'C_M = n / V (với n = 0,4 mol, V = 2 lít)',
    rewardCash: 60000,
    clueUnlock: 'Giải mã nồng độ dung dịch tinh khiết 0,2M.',
    options: [
      {
        label: 'A',
        text: '0,2 M (hoặc 0,2 mol/lít)',
        isCorrect: true,
        explanation: 'Chuẩn xác! C_M = n / V = 0,4 / 2 = 0,2 M (mol/lít).'
      },
      {
        label: 'B',
        text: '0,8 M',
        isCorrect: false,
        explanation: 'Sai do nhân n với V thay vì chia.'
      },
      {
        label: 'C',
        text: '5 M',
        isCorrect: false,
        explanation: 'Sai tỉ số rồi.'
      },
      {
        label: 'D',
        text: '0,4 M',
        isCorrect: false,
        explanation: 'Quên chia cho thể tích 2 lít rồi.'
      }
    ]
  },
  q_solubility_s: {
    id: 'q_solubility_s',
    question: '[ĐỘ TAN S TRONG NƯỚC] "Ở 20°C, hòa tan tối đa 36 gam muối NaCl vào 100 gam nước thì tạo thành dung dịch bão hòa. Độ tan (S) của muối NaCl ở 20°C là bao nhiêu?"',
    formulaHint: 'Công thức độ tan: S = (m_ct / m_H2O) × 100 (số gam chất tan trong 100g nước)',
    rewardCash: 60000,
    clueUnlock: 'Độ tan S = 36g/100g H2O được xác thực chuẩn xác theo SGK Kết Nối Tri Thức!',
    options: [
      {
        label: 'A',
        text: '36 gam / 100 gam nước',
        isCorrect: true,
        explanation: 'Đúng 100%! S = (36 / 100) × 100 = 36 g/100g nước.'
      },
      {
        label: 'B',
        text: '18 gam / 100 gam nước',
        isCorrect: false,
        explanation: 'Sai rồi.'
      },
      {
        label: 'C',
        text: '72 gam / 100 gam nước',
        isCorrect: false,
        explanation: 'Sai.'
      },
      {
        label: 'D',
        text: '26,47 gam / 100 gam nước',
        isCorrect: false,
        explanation: 'Nhầm sang nồng độ phần trăm rồi bạn ơi.'
      }
    ]
  }
};
