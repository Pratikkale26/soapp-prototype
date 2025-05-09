# SoApp - Revolutionizing In-Store Shopping Experience

SoApp is a revolutionary mobile application built with React Native and Expo that transforms the traditional shopping experience. It enables customers to scan products, pay, and leave the store without waiting in checkout queues, while providing enhanced security and convenience features.

## Features

### Core Shopping Features
- **Seamless Checkout**: Scan products directly while shopping using your device
- **Real-Time Inventory**: Get alerts for out-of-stock products
- **In-Store Navigation**: Find items with exact aisle directions
- **Multiple Language Support**: Accessible to all customers
- **Voice Commands**: Enhanced accessibility for elderly and visually impaired
- **Contactless Returns**: Process returns directly through the app

### Security Features
- **Biometric Authentication**: Secure payments using facial recognition and fingerprint
- **RFID/NFC Integration**: Theft prevention and secure checkout
- **Two-Factor Authentication**: Enhanced security for store exit
- **Product Monitoring**: Real-time tracking of inventory
- **Smart Weighing Systems**: Accurate tracking for bulk purchases

### User Experience
- **Store Selection**: Choose from multiple stores to shop from
- **Product Browsing**: Beautiful and intuitive interface
- **Category Navigation**: Easy navigation through product categories
- **Shopping Cart**: Add products to cart with a single tap
- **Search Functionality**: Search for products across the store
- **Modern UI**: Clean and responsive design with smooth animations
- **Cross-Platform**: Works on both iOS and Android devices

## Tech Stack

- React Native
- Expo
- TypeScript
- React Navigation
- Expo Router
- Lucide Icons
- React Native Reanimated
- React Native Gesture Handler
- NFC/RFID Integration
- Biometric Authentication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- bun
- Expo CLI
- iOS Simulator (for Mac) or Android Studio (for Android development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Pratikkale26/soapp-prototype
cd soapp-prototype
```

2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun run dev
```

4. Run on your preferred platform:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your physical device

## Project Structure

```
soapp-prototype/
├── app/                 # Main application screens
├── assets/             # Images, fonts, and other static assets
├── components/         # Reusable UI components
├── constants/          # Theme and other constants
├── context/           # React Context providers
├── data/              # Mock data and data utilities
├── hooks/             # Custom React hooks
└── node_modules/      # Dependencies
```

## Key Components

- **Landing Screen**: Welcome screen with app introduction
- **Store Selection**: Interface for selecting a store to shop from
- **Store View**: Main shopping interface with products and categories
- **NFC Integration**: Support for NFC-based interactions
- **Security Features**: Biometric authentication and RFID/NFC integration
- **Custom Components**: Reusable UI components like Button, Card, Typography

## Development

The project uses TypeScript for type safety and better development experience. The codebase follows modern React Native best practices and is structured for scalability.

### Available Scripts

- `bun run dev` - Start the development server
- `bun run build:web` - Build for web platform
- `bun run lint` - Run linting
- `bun run web` - Start web development server

## Contact

For any questions or to learn more about SoApp:
- Email: soappnew@gmail.com
- Phone: +91 7990590921
- Website: soappnew.netlify.app

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Expo team for the amazing framework
- React Native community for the excellent tools and libraries
- All contributors who have helped shape this project 