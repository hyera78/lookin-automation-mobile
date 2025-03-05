const { Given, When, Then, And } = require("@cucumber/cucumber");
const {
  initializeDriver,
  clickElement,
  enterText,
  getDriver,
  scrollEllement,
} = require("../../../common/support/appiumHelper");

// Given("the app launch", async function () {
//   await initializeDriver();
//   const isAppLaunched = await driver.isAppInstalled(
//     "devuat.lookin.lookinid.com"
//   ); // Mengecek apakah aplikasi terpasang
//   if (!isAppLaunched) {
//     throw new Error("Aplikasi tidak terpasang pada perangkat.");
//   }
// });

Given("the user click button login by email", async function () {
  await initializeDriver();
  await getDriver();
  await clickElement(
    '//android.widget.ImageView[@content-desc="Masuk dengan Email"]'
  );
  await driver.pause(3000);
});

When("the user input {string} and {string}", async function (email, password) {
  await enterText(
    '//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.widget.EditText[1]',
    email
  );
  await enterText(
    '//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.widget.EditText[2]',
    password
  );
});

When("the user click button enter", async function () {
  await clickElement('//android.widget.Button[@content-desc="Masuk"]');
  await driver.pause(3000);
});

Then(
  "the user should see the home page with the scroll view",
  async function () {
    await scrollEllement(
      '//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ScrollView'
    );
    await driver.pause(3000);
  }
);
