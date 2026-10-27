export interface ChemicalFormulaItem {
  id: string;
  category: 'kntt_core' | 'pho_culinary';
  name: string;
  symbol: string;
  formula: string;
  unit?: string;
  explanation: string;
  culinaryContext: string;
}

export const ALL_CHEMICAL_FORMULAS: ChemicalFormulaItem[] = [
  {
    id: 's_solubility',
    category: 'kntt_core',
    name: 'Độ Tan Của Một Chất Trong Nước',
    symbol: 'S',
    formula: 'S = (m_ct / m_H2O) × 100',
    unit: 'gam / 100 gam H2O',
    explanation: 'Số gam chất tan tối đa trong 100 gam nước ở nhiệt độ xác định để tạo thành dung dịch bão hòa.',
    culinaryContext: 'Độ tan của muối khoáng NaCl và gia vị tự nhiên trong nước sôi 100°C của nồi nước dùng phở.'
  },
  {
    id: 'c_percent',
    category: 'kntt_core',
    name: 'Nồng Độ Phần Trăm Của Dung Dịch',
    symbol: 'C%',
    formula: 'C% = (m_ct / m_dd) × 100%',
    unit: '%',
    explanation: 'Số gam chất tan có trong 100 gam dung dịch (m_dd = m_ct + m_dm).',
    culinaryContext: 'Độ đậm đà vừa miệng của nước cốt phở, duy trì ở mức chuẩn 8% - 10% để giữ vị thanh tao không bị gắt.'
  },
  {
    id: 'cm_molarity',
    category: 'kntt_core',
    name: 'Nồng Độ Mol Của Dung Dịch',
    symbol: 'C_M',
    formula: 'C_M = n / V',
    unit: 'mol/lít (M)',
    explanation: 'Số mol chất tan có trong 1 lít dung dịch.',
    culinaryContext: 'Nồng độ ion khoáng chất (Na+, K+, Cl-) hòa tan trong từng gáo nước dùng thanh khiết của quán phở.'
  },
  {
    id: 'sc_relation',
    category: 'kntt_core',
    name: 'Mối Liên Hệ Giữa C% Và Độ Tan S',
    symbol: 'C% ↔ S',
    formula: 'C% = [S / (S + 100)] × 100%',
    unit: '%',
    explanation: 'Công thức chuyển đổi nhanh giữa nồng độ phần trăm và độ tan của dung dịch bão hòa.',
    culinaryContext: 'Giúp điều chỉnh điểm bão hòa muối khoáng khi hầm xương bò suốt 12 tiếng liên tục.'
  },
  {
    id: 'mol_n',
    category: 'kntt_core',
    name: 'Công Thức Tính Số Mol Chất',
    symbol: 'n',
    formula: 'n = m / M',
    unit: 'mol',
    explanation: 'Trong đó m là khối lượng chất (g), M là khối lượng mol nguyên tử/phân tử (g/mol).',
    culinaryContext: 'Cân đo đong đếm liều lượng thảo mộc quế hồi đinh hương đạt chuẩn tỷ lệ vàng tuyệt đối.'
  },
  {
    id: 'vol_dkc',
    category: 'kntt_core',
    name: 'Thể Tích Khí Ở ĐKC (SGK Kết Nối Tri Thức mới)',
    symbol: 'V (đkc)',
    formula: 'V = n × 24,79',
    unit: 'lít (ở 25°C, 1 bar)',
    explanation: 'Theo chuẩn SGK Kết Nối Tri Thức mới: 1 mol chất khí bất kì ở đkc chiếm đúng 24,79 lít (thay cho 22,4L chuẩn cũ).',
    culinaryContext: 'Lượng khí thơm và hơi nước bốc lên từ nồi phở nghi ngút tỏa hương thơm ngát cả góc phố.'
  },
  {
    id: 'gas_density',
    category: 'kntt_core',
    name: 'Tỉ Khối Của Chất Khí',
    symbol: 'd',
    formula: 'd(A/B) = M_A / M_B  |  d(A/kk) = M_A / 29',
    unit: 'lần',
    explanation: 'So sánh độ nặng nhẹ của khí A so với khí B hoặc so với không khí (M_kk ≈ 29 g/mol).',
    culinaryContext: 'Hơi ấm và các phân tử tinh dầu nhẹ hơn không khí bay lơ lửng quyến rũ thực khách từ xa.'
  },
  {
    id: 'umami_synergy',
    category: 'pho_culinary',
    name: 'Hiệp Đồng Vị Ngọt Umami Đỉnh Cao',
    symbol: 'Umami Synergy',
    formula: 'Glutamate (C5H8NO4⁻) + Inosinate IMP (C10H11N4O8P²⁻)',
    unit: 'Tăng x8 lần vị ngọt thịt tự nhiên',
    explanation: 'Sự kết hợp giữa axit amin Glutamate trong thịt bò và Nucleotide Inosinate trong tủy xương tạo nên vị ngọt sâu lắng.',
    culinaryContext: 'Bí quyết nước dùng ngọt lịm từ xương tủy mà không cần bất kỳ hạt mì chính hay phụ gia công nghiệp nào.'
  },
  {
    id: 'collagen_gelatin',
    category: 'pho_culinary',
    name: 'Thủy Phân Collagen Nhiệt Độ Cao',
    symbol: 'Gelatin Formation',
    formula: 'Collagen + H2O —(t° hầm 12h)→ Gelatin (C102H151N31O39)',
    unit: 'Độ sánh béo ngậy',
    explanation: 'Nhiệt độ sôi phân cắt liên kết chéo của protein collagen trong gân xương thành gelatin tan trong nước cốt.',
    culinaryContext: 'Tạo nên màng sánh óng ánh và cảm giác dính môi béo ngậy đặc trưng của nước phở gia truyền.'
  },
  {
    id: 'spices_terpenes',
    category: 'pho_culinary',
    name: 'Phức Hợp Tinh Dầu Gia Vị Thảo Mộc',
    symbol: 'Aromatic Terpenes',
    formula: 'C9H8O (Quế) + C10H12O (Hồi) + C10H12O2 (Đinh hương) + C17H19NO3 (Tiêu)',
    unit: 'Hợp chất bay hơi thơm nồng',
    explanation: 'Cinnamaldehyde (quế), Anethole (hồi), Eugenol (đinh hương) và Piperine (tiêu) hòa quyện tạo hương vị ấm nồng.',
    culinaryContext: 'Gia vị được sao vàng thơm lừng trên chảo gang trước khi bọc vào túi vải thả vào nồi nước dùng.'
  },
  {
    id: 'maillard_reaction',
    category: 'pho_culinary',
    name: 'Phản Ứng Maillard Nướng Gừng Hành',
    symbol: 'Maillard Browning',
    formula: 'Amino Acid + Đường Khử —(nướng than hồng)→ Pyrazine + Furan',
    unit: 'Màu hổ phách & Hương khói',
    explanation: 'Hành tím và gừng già nướng cháy xém vỏ trên than hoa kích hoạt phản ứng tạo ra hàng trăm hợp chất thơm phức.',
    culinaryContext: 'Mang lại màu nước dùng vàng óng ả hổ phách trong veo và khử sạch mùi hôi tanh của xương bò.'
  },
  {
    id: 'bone_minerals',
    category: 'pho_culinary',
    name: 'Chiết Xuất Khoáng Canxi Phốt-phát Tự Nhiên',
    symbol: 'Mineral Extraction',
    formula: 'Ca3(PO4)2 + Axit Hữu Cơ —(hầm)→ Ca²⁺ + PO4³⁻',
    unit: 'Khoáng vi lượng',
    explanation: 'Quá trình ninh xương chậm chiết xuất canxi và phốt-phát tự nhiên cung cấp dưỡng chất bồi bổ sinh lực.',
    culinaryContext: 'Nước phở không chỉ ngon miệng mà còn là bài thuốc bổ dưỡng gia truyền giúp khỏe khoắn tinh thần.'
  }
];
