// Map districts and towns to their codes
const districtCodes = {
  kampala: "KLA",
  wakiso: "WAK",
  mukono: "MUK",
  jinja: "JIN",
  masaka: "MAS",
  mbarara: "MBA",
  gulu: "GUL",
  lira: "LIR",
  arua: "ARU",
  fortportal: "FTP",
  hoima: "HOI",
  mbale: "MBL",
  soroti: "SOR",
  entebbe: "ENT",
  kabale: "KAB",
  tororo: "TOR",
  iganga: "IGA",
  busia: "BUS",
  masindi: "MSD",
  kabarole: "KBR",
  // Add more districts as needed
};

const townCodes = {
  namsuba: "NAM",
  kajjansi: "KAJ",
  kyengera: "KYE",
  bukoto: "BUK",
  nsambya: "NSB",
  nakawa: "NAK",
  kireka: "KIR",
  bweyogerere: "BWE",
  kasangati: "KAS",
  gayaza: "GAY",
  mukono: "MUK",
  lugazi: "LUG",
  jinja: "JIN",
  bugembe: "BUG",
  iganga: "IGA",
  busia: "BUS",
  mbale: "MBL",
  soroti: "SOR",
  lira: "LIR",
  gulu: "GUL",
  arua: "ARU",
  hoima: "HOI",
  masindi: "MSD",
  fortportal: "FTP",
  kabale: "KAB",
  mbarara: "MBA",
  masaka: "MAS",
  entebbe: "ENT",
  // Add more towns as needed
};

// Generate unique code based on district and town
exports.generateUniqueCode = (district, town) => {
  // Get district code (use predefined or generate from first 3 letters)
  const districtCode =
    districtCodes[district.toLowerCase()] || district.slice(0, 3).toUpperCase();

  // Get town code (use predefined or generate from first 3 letters)
  const townCode =
    townCodes[town.toLowerCase()] || town.slice(0, 3).toUpperCase();

  // Generate a random 4-digit number
  const randomNumber = Math.floor(1000 + Math.random() * 9000);

  // Combine to create the unique code
  return `${districtCode}-${townCode}-${randomNumber}`;
};

// Generate postcode based on district
exports.generatePostcode = (district) => {
  const districtCode = districtCodes[district.toLowerCase()] || "UDT"; // Default to 'UDT' if district is unknown
  const randomNumber = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number
  return `${districtCode}-${randomNumber}`;
};
