# 📱 Docublink

> **Your details, everywhere - instantly**

Docublink is an intelligent React Native application that revolutionizes form-filling by automatically populating Google Forms with your personal information using AI-powered field detection and mapping.

## 🌟 Features

### 🚀 Core Functionality
- **Smart Form Auto-Fill**: Automatically fills Google Forms using AI-powered field detection
- **Secure Data Storage**: All personal information is stored securely using Expo Secure Store
- **Google Authentication**: Seamless sign-in with Google OAuth integration
- **Cross-Platform Support**: Built with React Native for iOS, Android, and Web
- **AI-Powered Mapping**: Uses Google's Gemini AI to intelligently map form fields to user data

### 🎯 Key Features
- **QuickForm**: Paste any Google Form URL and let AI fill it automatically
- **Personal Data Management**: Comprehensive user profile with support for:
  - Personal Information (Name, Email, Contact, ID Numbers)
  - Student Information (College, Course, GPA, Skills)
  - Professional Information (Company, Job Title, Experience)
  - Social Profiles (GitHub, LinkedIn, Twitter)
- **Offline Support**: Firebase offline persistence for reliable data access
- **Document Templates**: Pre-built templates for common form types
- **Manual Data Entry**: Flexible data input through intuitive UI
- **Sync Management**: Control data synchronization preferences

### 🛡️ Security & Privacy
- **Secure Storage**: All sensitive data encrypted using device-level security
- **Local Processing**: Form analysis happens locally for privacy
- **No Data Leakage**: Personal information never leaves your device without consent
- **Biometric Protection**: Face ID/Fingerprint support for data access

## 🏗️ Architecture

### Tech Stack
- **Framework**: React Native with Expo
- **Navigation**: Expo Router with file-based routing
- **State Management**: Zustand for global state
- **UI Components**: Custom themed components with TypeScript
- **Backend**: Firebase Firestore for data synchronization
- **AI Integration**: Google Gemini 2.0 Flash for form analysis
- **Authentication**: Google Sign-In
- **Styling**: React Native StyleSheet with theme support

### Project Structure
```
📁 Docublink/
├── 📁 app/                     # Expo Router pages
│   ├── 📁 (logged-in)/        # Protected routes
│   │   └── 📁 (tabs)/         # Tab navigation
│   │       ├── index.tsx      # Home/QuickForm screen
│   │       ├── documents.tsx  # Document templates
│   │       └── profile.tsx    # User profile management
│   └── index.tsx              # Landing/Authentication
├── 📁 components/             # Reusable UI components
│   ├── 📁 ui/                # Feature-specific components
│   └── Themed*.tsx           # Theme-aware base components
├── 📁 modules/               # Feature modules
│   ├── 📁 ai/               # AI integration utilities
│   ├── 📁 firebase/         # Firebase utilities
│   └── 📁 secure-storage/   # Secure storage management
├── 📁 services/             # External API services
├── 📁 store/                # Zustand state stores
├── 📁 constants/            # App constants and prompts
└── 📁 utils/                # Helper utilities
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/docublink.git
   cd docublink
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up credentials**
   ```bash
   cp credentials.example.js credentials.js
   ```
   
   Edit `credentials.js` and add your:
   - Google OAuth client IDs
   - Firebase configuration
   - API keys

4. **Configure Firebase**
   - Create a Firebase project
   - Enable Firestore database
   - Add your Firebase configuration to `credentials.js`

5. **Set up Google Sign-In**
   - Configure OAuth consent screen in Google Cloud Console
   - Add authorized domains
   - Update client IDs in `credentials.js`

### Running the App

```bash
# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web
```

## 📱 Usage

### First Time Setup
1. **Launch the app** and sign in with Google
2. **Set up Gemini API Key** when prompted (required for AI features)
3. **Complete your profile** with personal information
4. **Enable sync** to backup data to Firebase

### Using QuickForm
1. **Copy a Google Form URL** from your browser
2. **Paste it** in the QuickForm input field
3. **Tap the magic wand** to let AI analyze and fill the form
4. **Review and submit** the auto-filled form

### Managing Your Data
- **Profile Tab**: View and edit all your personal information
- **Documents Tab**: Access pre-built templates for common forms
- **Sync Toggle**: Control data synchronization with Firebase
- **Data Categories**:
  - Basic Info: Name, email, contact, ID numbers
  - Student Info: College details, GPA, academic information
  - Professional Info: Work experience, skills, job details
  - Social Profiles: GitHub, LinkedIn, Twitter links

## 🤖 AI Integration

Docublink uses Google's Gemini AI to intelligently analyze form fields and map them to your personal data:

### How It Works
1. **Form Analysis**: AI analyzes the HTML structure of Google Forms
2. **Field Detection**: Identifies input fields and their semantic meaning
3. **Smart Mapping**: Maps form fields to appropriate user data fields
4. **Script Generation**: Creates JavaScript to automatically fill the form
5. **Secure Execution**: Runs the script in a controlled WebView environment

### Supported Field Types
- Text inputs (name, email, address)
- Educational information (college, course, GPA)
- Professional details (company, job title, experience)
- Contact information (phone, social profiles)
- Government IDs (Aadhaar, PAN, Passport, Voter ID)

## 🔧 Configuration

### Environment Variables
Create a `credentials.js` file with the following structure:

```javascript
export const credentials = {
  webClientId: "your-google-web-client-id",
  scopes: ['profile'],
  offlineAccess: true,
  forceCodeForRefreshToken: false,
  iosClientId: "your-google-ios-client-id",
}

export const firebaseConfig = {
  apiKey: "your-firebase-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
}
```

### Build Configuration
- **EAS Build**: Configured for development, preview, and production builds
- **App Store**: iOS bundle identifier: `com.khushalbhasin.Docublink`
- **Google Play**: Android package: `com.khushalbhasin.Docublink`

## 🛠️ Development

### Code Style
- **TypeScript**: Strict typing throughout the application
- **Functional Components**: React hooks-based architecture
- **Standard.js**: Code formatting and linting rules
- **Modular Design**: Feature-based organization

### Key Libraries
- **@ai-sdk/google**: Gemini AI integration
- **@react-native-google-signin/google-signin**: Google authentication
- **firebase**: Backend services and offline support
- **zustand**: Lightweight state management
- **expo-secure-store**: Encrypted local storage
- **react-native-webview**: Form rendering and interaction

### Testing
```bash
# Run linter
npm run lint

# Type checking
npx tsc --noEmit
```

## 📦 Building

### Development Build
```bash
eas build --profile development
```

### Production Build
```bash
# iOS
eas build --platform ios --profile production

# Android
eas build --platform android --profile production
```

## 🔒 Security Considerations

- **Data Encryption**: All personal data is encrypted using Expo Secure Store
- **API Key Security**: Gemini API keys are stored securely and never logged
- **Network Security**: HTTPS-only communication with external services
- **Permission Management**: Minimal permissions requested
- **Biometric Protection**: Optional Face ID/Touch ID for app access

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain consistent code style
- Add tests for new features
- Update documentation as needed
- Ensure cross-platform compatibility

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for intelligent form analysis
- **Expo** for the excellent React Native framework
- **Firebase** for reliable backend services
- **React Native Community** for amazing open-source libraries


## 🔮 Roadmap

- [ ] **OCR Integration**: Extract data from document images
- [ ] **Multi-language Support**: Internationalization
- [ ] **Team Collaboration**: Share templates and data
- [ ] **Advanced AI**: Support for more complex forms
- [ ] **Browser Extension**: Desktop form filling
- [ ] **API Integration**: Connect with popular services
- [ ] **Analytics**: Usage insights and optimization

---

**Made with ❤️ by [Khushal Bhasin](https://github.com/khushalbhasin)**

*Docublink - Simplifying form-filling, one field at a time.*