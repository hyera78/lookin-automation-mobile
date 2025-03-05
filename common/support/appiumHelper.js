const wdio = require("webdriverio");

const options = {
  path: "/", // Ubah ini dari "/wd/hub"
  port: 4723,
  hostname: "127.0.0.1", // Tambahkan ini
  capabilities: {
    platformName: "Android",
    "appium:deviceName": "Infinix_X663B", // Nama perangkat
    "appium:udid": "0758725231000397", // UDID perangkat
    "appium:automationName": "UiAutomator2", // Mesin automasi
    "appium:appPackage": "devuat.lookin.lookinid.com", // Paket aplikasi
    "appium:appActivity": "id.lookin.lookin_id.MainActivity", // Aktivitas utama aplikasi
    "appium:noReset": true, // Jangan reset aplikasi
  },
};

let driver;

module.exports = {
  // Inisialisasi driver
  initializeDriver: async function () {
    try {
      if (!driver) {
        driver = await wdio.remote(options);
        console.log("Driver berhasil diinisialisasi");
      }
      return driver;
    } catch (error) {
      console.error("Gagal menginisialisasi driver:", error);
      throw error;
    }
  },

  // Ambil instance driver
  getDriver: function () {
    if (!driver) {
      throw new Error(
        "Driver belum diinisialisasi. Panggil initializeDriver() terlebih dahulu."
      );
    }
    return driver;
  },

  // Hentikan sesi driver
  quitDriver: async function () {
    if (driver) {
      await driver.deleteSession();
      driver = null;
    }
  },

  // Fungsi umum: klik elemen
  // Fungsi umum: klik elemen
  clickElement: async function (elementXpath) {
    console.log("Mencoba mengklik elemen dengan XPath:", elementXpath);
    if (!driver) {
      throw new Error("Driver belum diinisialisasi.");
    }
    const element = await driver.$(elementXpath); // Menggunakan XPath
    console.log("Elemen ditemukan:", element);
    await element.waitForExist({ timeout: 5000 });
    await element.click();
  },

  // Fungsi umum: masukkan teks
  enterText: async function (xpath, text) {
    const element = await driver.$(xpath); // Menggunakan XPath
    await element.setValue(text);
  },

  // Fungsi scroll elemen
  scrollEllement: async function (scrollXpath) {
    let element = await driver.$(scrollXpath); // Menggunakan XPath
    let isVisible = await element.isDisplayed();

    while (!isVisible) {
      await driver.execute("mobile: scroll", { direction: "down" }); // Scroll ke bawah
      element = await driver.$(scrollXpath); // Coba temukan lagi elemen dengan XPath
      isVisible = await element.isDisplayed(); // Periksa apakah elemen sekarang terlihat
    }
  },
};
