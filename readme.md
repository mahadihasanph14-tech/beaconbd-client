# 🌱 BeaconBD – Social Development Platform

**BeaconBD** is a community-driven social development platform designed to bring people together through meaningful social activities. Users can discover upcoming events, participate in community initiatives, and contribute to building a better society.

From environmental cleanup campaigns to educational programs and donation drives, BeaconBD makes community participation easier and more accessible.

🔗 **Live Website:** https://beaconbd.netlify.app

---

## ✨ Key Features

* 🔐 **User Authentication:** Secure registration and login using Better Auth.
* 🌐 **Google Login:** Sign in easily using a Google account.
* 📅 **Event Discovery:** Browse upcoming social development events.
* 🔎 **Event Details:** View detailed information about individual events.
* ➕ **Event Management:** Create and manage community events.
* ✏️ **Update Events:** Edit events created by the logged-in user.
* 🗑️ **Delete Events:** Remove events with appropriate ownership permissions.
* 🙋 **Join Events:** Participate in community activities.
* 🔒 **Protected Routes:** Restrict private pages and actions to authenticated users.
* 📱 **Responsive Design:** Optimized for mobile, tablet, and desktop devices.
* 🔔 **Toast Notifications:** Receive instant feedback for important actions.
* ⏳ **Loading States:** Improved user experience during data fetching and processing.

---

## 🛠️ Technologies Used

| Technology   | Purpose                 |
| ------------ | ----------------------- |
| Next.js      | React framework         |
| React        | User interface          |
| TypeScript   | Type safety             |
| Tailwind CSS | Styling                 |
| Better Auth  | Authentication          |
| MongoDB      | Authentication database |
| Express API  | Backend communication   |
| Sonner       | Toast notifications     |
| Lucide React | Icons                   |
| Netlify      | Frontend deployment     |

---

## 📂 Project Structure

```text
social-development-client/
│
├── public/
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   ├── login/
│   │   ├── register/
│   │   ├── events/
│   │   └── ...
│   │
│   ├── components/
│   │
│   └── lib/
│       ├── api.ts
│       ├── auth.ts
│       └── auth-client.ts
│
├── .env.local
├── next.config.ts
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/mahadihasanph14-tech/beaconbd-client.git
```

### 2. Navigate to the Project Directory

```bash
cd beaconbd-client
```

### 3. Install Dependencies

bash
npm install


### 4. Configure Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

env
NEXT_PUBLIC_API_URL=https://beaconbd-server.onrender.com/api

BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_better_auth_secret

MONGODB_URI=your_mongodb_connection_string

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret


**Important:** Replace the placeholder values with your actual credentials. Never upload your secret keys or `.env.local` file to GitHub.

### 5. Run the Development Server

bash
npm run dev


Open your browser and visit:

text
http://localhost:3000


---

## 🌐 Backend API

BeaconBD communicates with a separate Express.js backend API.

**Backend API URL:**

https://beaconbd-server.onrender.com

The backend handles event data, database operations, and authenticated API requests.

---

## 🔑 Authentication

BeaconBD uses Better Auth for authentication.

Available authentication features:

* Email and password registration.
* Email and password login.
* Google social login.
* Session management.
* Protected routes.
* JWT-based authentication for API requests.

---

## 🚀 Deployment

The frontend application is deployed using Netlify.

**Live Project:** https://beaconbd.netlify.app

---

## 🎯 Project Goal

The goal of BeaconBD is to encourage social responsibility and community engagement by connecting people with meaningful development activities.

Small actions can create big changes. Together, we can make a difference!



⭐ If you find this project interesting, feel free to explore the repository!
