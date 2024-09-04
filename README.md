# AriaCare Chat Application

AriaCare is a compassionate and understanding virtual companion designed to provide a safe and supportive space for users to discuss their problems, stress, or anxiety. This project is built using React, Next.js, Firebase, and Material-UI, incorporating AI-powered conversational abilities with OpenAI's GPT-3.5-turbo model.

## Features

- **Interactive Conversations**: Aria provides supportive, non-judgmental conversations and guides users through mindfulness exercises.
- **AI-Powered Responses**: Aria uses the OpenAI GPT-3.5-turbo model to generate meaningful, comforting responses based on user input.
- **Dark/Light Mode**: Users can toggle between dark and light modes for a comfortable viewing experience.
- **Real-Time Conversations**: Messages are sent and responded to in real-time, simulating a natural conversation flow.
- **Time Stamps**: Each message displays the time it was sent to enhance the chat experience.
- **Internationalization (i18n)**: The application supports multiple languages for a global user base.
- **Vercel Analytics**: Tracks user interactions for insights and improvements.

## Technologies Used

- **React**: Frontend library for building the UI.
- **Next.js**: Framework for server-side rendering and backend API routes.
- **OpenAI API**: Provides AI-powered responses using the GPT-3.5-turbo model.
- **Firebase**: Used for backend services like storing messages and notes.
- **Material-UI (MUI)**: A React component library used for UI design.
- **i18n**: Supports multi-language functionality, allowing users to switch between English and Dutch.
- **Vercel Analytics**: For tracking and analyzing user interactions.

## Setup & Installation

To run the AriaCare app locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/aria-care.git
   ```

2. Navigate to the project directory:

   ```bash
   cd aria-care
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Set up Firebase:
   - Create a Firebase project and configure Firestore.
   - Add your Firebase credentials in the `firebase.js` file.

5. Set up OpenAI API:
   - Get an API key from OpenAI.
   - Add your API key to the environment variables (`OPENROUTER_API_KEY`).

6. Run the application in development mode:

   ```bash
   npm run dev
   ```

7. Open your browser and navigate to `http://localhost:3000` to start interacting with Aria.

## Usage

- **Start a Conversation**: Open the chat and type your message. Press "Enter" or click the "Send" button to submit.
- **Toggle Dark/Light Mode**: Click the sun/moon icon to switch between themes.
- **View Timestamps**: Each message shows the time it was sent for easy tracking.
- **Change Language**: Use the language switcher to toggle between English and Dutch.
- **Real-time AI Response**: Aria will respond instantly, providing comforting and helpful advice.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or want to contribute to the project, feel free to contact me:

- **Email**: [mohakhazza@gmail.com](mailto:mohakhazza@gmail.com)
- **GitHub**: [github.com/your-username](https://github.com/your-username)

Stay tuned for updates and new features!
