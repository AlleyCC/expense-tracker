# expense-tracker

 屬於你的個人化記帳本
 
 ## Features 

1. Browse expense records

2. Create new expense record      

3. Edit and Delete your past expense record

4. Create personal account
 
 ## Environment Setup
 - [Node.js](https://nodejs.org/en/) 
 - [express](https://www.npmjs.com/package/express)

 ## Install 
 
 1.打開終端機，將此專案複製至本機
 ```
 git clone https://github.com/AlleyCC/expense-tracker.git
 ```
 2.cd進入檔案夾中並安裝npm
 
 3.安裝其他套件: 詳閱package.json檔中的"dependencies"
 
 4.於.env.example檔中輸入你的FACEBOOK_ID以及FACEBOOK_SECRET
 
 5.匯入內建預設使用者資料
 ```
 npm run seed1
 ```
 then,
 ```
 npm run seed2
 ```
 6.執行檔案
 ```
 npm run dev
 ```
 7.至瀏覽器網址欄輸入
 ```
 http://localhost:3000
 ```
