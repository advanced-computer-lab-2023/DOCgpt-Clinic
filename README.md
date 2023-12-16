# EL7A2NI 
Welcome to our Virtual Clinic Platform! Our website is designed to offer a seamless and user-friendly experience, providing easy access to a range of virtual clinic features. Users can create accounts, build profiles, schedule appointments, follow up on their health progress, subscribe to health packages, manage and upload health records securely, and explore information about doctors across various specialties. Our platform aims to streamline the virtual healthcare experience, ensuring convenient access to all clinic services. Whether you're looking to connect with healthcare professionals, manage your health records, explore our diverse range of features,or even join our team, our virtual clinic is here to cater to your needs.
## Badges

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

## Table of Contents
- [Motivation](#motivation)
- [Build Status](#build-status)
- [Code Style](#code-style)
- [Screenshots](#screenshots)
- [Framework](#framework)
- [Features](#features)
- [Code Examples](#code-examples)
- [Installation](#installation)
- [API References](#api-references)
- [Tests](#tests) 
- [How to use?](#how-to-use)
- [Contributing](#Contributing)
- [Credits](#credits)
- [License](#License)

## Motiviation :fire:
This project was created as a part of Advanced Computer Lab course. The objectives for this course were:
1. Learn how to properly use the Agile Methodology to plan out a project and develop the software.
2. Learn the process of following a given set of System Requirements to develop a software.
3. Learn to research and master the use of the MERN Stack.
4. Learn how to work together as a team on GitHub.

At our Virtual Clinic Platform, we strive to transform the healthcare experience, offering a user-centric platform that simplifies access to a wide range of virtual clinic services. Whether it's scheduling appointments, consulting with healthcare professionals, managing health records, or exploring career opportunities in the medical field, our platform prioritizes user convenience, privacy, and dependability. Discover a seamless and stress-free virtual clinic experience, designed to meet your healthcare needs with ease.

## Build Status :mechanical_arm:
- The project is currently in development.
- Unit tests will be added.
- A message broker needs to be added to the application to handle asynchronous tasks such as sending emails and notifications.
- A caching layer needs to be added to the application.
- How documents are uploaded in sign up page.

## Code Style :writing_hand:

[![Code Style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)
You can then run Prettier on your code by using the prettier command in your terminal. For example:
bash
prettier --write "src/**/*.{js,ts}"

## Screenshots 

### Landing Page 
<details>
<img  src="Clinic/Clinic Landing 1.png"><br>
<img  src="Clinic/Clinic Landing 2.png"><br>
</details>

### Admin Pages 
<details>
<img  src="Clinic/Admin's Doctors Requests.png"><br>
<img  src="Clinic/Doctor's Information.png"><br>
</details>

### Doctor Pages 
<details>
<img  src="Clinic/Doctor's Home Page.png"><br>
<img  src="Clinic/Doctor's Notifications.png"><br>
<img  src="Clinic/Prescription Details Doctor.png"><br>
<img  src="Clinic/Clinic/Doctor's Appointments.png"><br>
<img  src="Clinic/Doctor's Follow Up Requests.png"><br>
<img  src="Clinic/Clinic Chat 1.png"><br>
<img  src="Clinic/Clinic Chat 2.png"><br>
</details>

### Patient Pages 
<details>
<img  src="Clinic/Patient's Health Record 1.png"><br>
<img  src="Clinic/Patients's Health Record 2.png"><br>
<img  src="Clinic/Health Packages.png"><br>
<img  src="Clinic/Screenshot 2023-12-16 at 11.49.11 PM.png"><br>
<img  src="Clinic/Snack Bar Alert.png"><br>
</details>

## Tech and Framework used 🧰
-   [React](https://reactjs.org/)
-   [Node.js](https://nodejs.org/en/)
-   [Express](https://expressjs.com/)
-   [MongoDB](https://www.mongodb.com/)
-   [Mongoose](https://mongoosejs.com/)
-   [Material-UI](https://material-ui.com/)
-   [Stripe](https://stripe.com/)
-   [Git](https://git-scm.com/)
-   [Github Actions](github.com/features/actions)
-   [NodeMailer](https://nodemailer.com/about/)
-   [Postman](https://www.postman.com/)
-   [VSCode](https://code.visualstudio.com/)
-   [JWT](https://jwt.io/)

## Features
The system serves different type of users (Admin, Pharmacist , Patient, Doctor)

### As an Admin I can
* View / Delete Patients.
* View / Delete Pharmacists.
* Add another Admin.
* View / Accept / Reject Pharamcists requets.
* View / Filter Medicines.
* View Sales reports.

### As a Patient I can
* View / Filter / Buy Medicines.
* View my Orders.
* View my Wallet.
* Add Delivery Addresses.
* View / Accept / Reject Pharamcists requets.
* View / Filter Medicines.
* View Sales reports.
* Chat and ask for medical consultations.
* View my notfications.

### As a Pharmacist I can
* View / Edit Medicines.
* Add new Medicines.
* View Sales report.

### As a Doctor I can
* Navigates to the pharmacy website to add medicines to the prescription.

General Features : 

|       Feature                   | 🔰 Status  
| -------------------------- | :----------------:| 
| Authentiation            |         ✔️         |    
| Authorization            |         ✔️         |    
| User Roles             |         ✔️         |    
| Payments         |         ✔️         |   
| User Email Notifications  |         ✔️         |      
| User Password Reset    |         ✔️         |  
| Realtime Chat   |         ✔️         |  
| Medicine Delivery    |         ✔️         |  
| Edit/Add/Archive Medicines    |         ✔️         |  
| Documents Upload    |         ✔️         |  


## LICENSE
This project is licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0) and [MIT License](https://opensource.org/licenses/MIT).

## Credits

### Videos
- Videos on the website are sourced from YouTube.
  - [Video Title 1](link-to-video-1)

### Tutorials
- Tutorials from YouTube were referenced during the development of this project.
  - [React CSV Download](https://www.youtube.com/watch?v=IPEqb_AJbAQ)
  - [MERN Stack](https://youtube.com/playlist?list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE&si=BhSnCLJzAsbEZMJp)
  -   [Install TypeScript And Transpile Files](https://youtu.be/pc5IlcEn8vw?si=UDJSEkoCHPamrBQp)
  -   [Filter](https://youtu.be/ZoayCCDHFiI?si=H6O5gT2Z5H7le5l9)
  -   [Upload and Display Images](https://youtu.be/jfZyqZycjmA?si=zParjdNyOtgrleC5)

### Photos
- Photos used in this project are from [Freepik](https://www.freepik.com/).

## Contributing 
Contributions are always welcome!
See contributing.md for ways to get started.
Please adhere to this project's code of conduct.

## Installation
In order to install this project locally, simply fork and clone the repository or download as zip and unzip on your machine.
 * Open the project in your prefered code editor.
 * Go to terminal -> New terminal (If you are using VS code)
 * Split your terminal into two (run the backend on one terminal and the frontend on the other terminal).
 
## How to use 
### In the first terminal
bash
> git clone https://github.com/advanced-computer-lab-2023/DOCgpt-Pharmacy.git
> git checkout sprint3start
> cd backend/
> cd backend/npm init
> cd backend/npm install
> cd backend/tsc
> cd backend/npm run dev

### In the second terminal
bash
> cd frontend/
> cd frontend/npm init
> cd frontend/npm install
> cd frontend/npm start


### Environment Variables 

PORT

MONGO_URI

ACCESS_TOKEN_SECRET

REFRESH_TOKEN_SECRET

STRIPE_SECRET_KEY
