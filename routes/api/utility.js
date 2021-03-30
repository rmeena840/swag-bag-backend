let swd = require("selenium-webdriver");
let browser = new swd.Builder();
let tab = browser.forBrowser("chrome").build();

const webpage = require('./webpageData');

const getProduct = new Promise((resolve, reject) => {
    let email = webpage.userName;
    let pass = webpage.password;
    let loginPage = webpage.login_page;
    let inventoryPage = webpage.inventory_page;
    var response = [];

    // login page
    let tabToOpen = tab.get(loginPage);
    tabToOpen
    .then(function () {
  
        // Timeout to wait if connection is slow
        let findTimeOutP =
            tab.manage().setTimeouts({
                implicit: 5000, // 5 seconds
            });
        return findTimeOutP;
    }).then( () => {

        // find username input field
        let promiseUsernameBox =
            tab.findElement(swd.By.css("#user-name"));
        return promiseUsernameBox;
    })
    .then( (usernameBox) => {

        // send key to input field
        let promiseFillUsername =
            usernameBox.sendKeys(email);
        return promiseFillUsername;
    })
    .then( () => {

        // find password input field
        let promisePasswordBox =
            tab.findElement(swd.By.css("#password"));
        return promisePasswordBox;
    })
    .then( (passwordBox) => {

        // send key to password input field
        let promiseFillPassword =
            passwordBox.sendKeys(pass);
        return promiseFillPassword;
    })
    .then( () => {
        
        // find login submit button
        let promiseSignInBtn = tab.findElement(
            swd.By.css("#login-button")
        );
        return promiseSignInBtn;
    })
    .then( (signInBtn) => {

        // tigger login submit button
        let promiseClickSignIn = signInBtn.click();
        return promiseClickSignIn;
    })
    .then( () => {

      // jump to inventory page after login
      let tab2 =
      tab.get(inventoryPage);

      tab2.then(function () {
  
        // Timeout to wait if connection is slow
        let findTimeOutP =
            tab.manage().setTimeouts({
                implicit: 5000, // 5 seconds
            });
        return findTimeOutP;
    }).then(function(){
        let promiseUsernameBox =
            tab.findElements(swd.By.css(".inventory_item"));
        return promiseUsernameBox;
      }).then(function(elements){

        // number of inventory items
          let elementCount = elements.length;
          elements.map((item,index)=>{
            // inventory item
            let resItem = {
                id: index,
                product_name: "",
                product_description: "",
                product_price: "",
                product_image : ""
            };

            // get img url
            item.findElement(swd.By.xpath('//img[@class="inventory_item_img"]')).then((data)=>{
              data.getAttribute('src').then((data)=> {
                  resItem.product_image = data;
                  // get product name
                  item.findElement(swd.By.css('.inventory_item_name')).then((data)=>{
                    data.getText().then((data)=> {
                        resItem.product_name = data
                        // get product description
                        item.findElement(swd.By.css('.inventory_item_desc')).then((data)=>{
                            data.getText().then((data)=> {
                                resItem.product_description = data
                                // get product price
                                item.findElement(swd.By.css('.inventory_item_price')).then((data)=>{
                                    data.getText().then((data)=> {
                                        resItem.product_price = data
                                        response.push(resItem);
                                        // resolve at the end of map item
                                        if (elementCount == response.length) {
                                            resolve(response)
                                        }
                                    });
                                })
                            } );
                        })
                    });
                })
              });
          })
        })
      })
    })
    // resolve promise
    resolve(response)
  });

module.exports = getProduct;
