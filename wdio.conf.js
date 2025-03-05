exports.config = {
  runner: "local", // Pengujian dijalankan di mesin lokal
  specs: [
    "./features/login/login.feature", // Tentukan file fitur login yang akan dijalankan
  ],
  exclude: [],
  maxInstances: 1,
  capabilities: [
    {
      platformName: "Android",
      "appium:deviceName": "Infinix_X663B", // Nama perangkat Android
      "appium:udid": "0758725231000397", // UDID perangkat
      "appium:automationName": "UiAutomator2", // Mesin automasi Android
      "appium:appPackage": "devuat.lookin.lookinid.com", // Paket aplikasi
      "appium:appActivity": "id.lookin.lookin_id.MainActivity", // Aktivitas utama aplikasi
      "appium:noReset": true, // Jangan reset aplikasi setelah setiap sesi
    },
  ],
  logLevel: "info",
  bail: 0,
  waitforTimeout: 60000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  services: ["appium"], // Menggunakan Appium sebagai service
  appium: {
    command: "appium",
    args: {
      address: "127.0.0.1", // Tambahkan ini
      port: 4723,
      basePath: "/", // Ubah ini dari default
    },
  },
  framework: "cucumber", // Menentukan menggunakan Cucumber untuk BDD
  reporters: ["spec", "allure"], // Laporan yang digunakan

  // Konfigurasi untuk Cucumber
  cucumberOpts: {
    require: [
      "./common/support/appiumHelper.js", // Langkah-langkah umum
      "./features/login/step_definitions/loginStep.js", // Langkah-langkah untuk login
    ],
    backtrace: false,
    requireModule: ["@babel/register"],
    dryRun: false,
    failFast: false,
    format: ["json:./reports/cucumber-report.json"],
  },

  // Hooks (Fungsi yang dijalankan sebelum dan setelah pengujian)
  beforeSession: function (config, capabilities, specs) {
    console.log("Sesi pengujian dimulai");
  },
  before: function (capabilities, specs) {
    console.log("Sebelum pengujian dimulai");
  },
  after: function (result, capabilities, specs) {
    console.log("Setelah pengujian selesai");
  },
  afterSession: function (config, capabilities, specs) {
    console.log("Sesi pengujian selesai");
  },
};
