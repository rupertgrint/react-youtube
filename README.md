# YouTube Clone

This is a YouTube clone application built with React, JavaScript, Tailwind CSS, YouTube Data API, and Axios. It allows users to browse and watch videos, similar to the original YouTube UI. The app is designed with reusable components, context for API handling, and a way to toggle between real and fake YouTube data for testing and development.

## Features

- Browse videos by most popular or keyword
- Watch main video and related videos on the Video Detail page
- View video information, including channel name and video description
- Responsive design using Tailwind CSS
- Fake YouTube Client data to avoid hitting YouTube API limits while developing

## Technologies Used

- React and JavaScript: for building UI and interactivity
- Tailwind CSS: for styling
- YouTube Data API: for fetching live data
- Axios: for handling API requests

## Folder Structure

```
youtube-clone/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── api/
│   │   ├── fakeYoutubeClient.js      # Uses saved JSON files to mock API data
│   │   └── youtubeClient.js          # Handles real API requests
│   ├── components/
│   │   ├── ChannelInfo.jsx           # Displays channel info for a video
│   │   ├── Header.jsx                # Navigation header with search functionality
│   │   ├── MainVideo.jsx             # Main video display component
│   │   ├── RelatedVideos.jsx         # Displays a list of related videos
│   │   └── VideoCard.jsx             # Video card for video previews
│   ├── context/
│   │   └── YoutubeApiContext.jsx     # Provides YouTube API context
│   ├── hooks/
│   │   └── use-videos.js             # Custom hook for fetching video data
│   ├── pages/
│   │   ├── Home.jsx                  # Main page showing popular videos
│   │   ├── NotFound.jsx              # Fallback page for unknown routes
│   │   ├── Root.jsx                  # Root layout component
│   │   └── VideoDetail.jsx           # Page to show video details and related videos
│   ├── App.js                        # Main application component
│   ├── index.js                      # Entry point for the React app
│   └── index.css                     # Base styles
├── tailwind.config.js                # Tailwind CSS configuration
├── package.json                      # Project dependencies and scripts
└── README.md                         # Project README
```

## YouTube API Context

The YoutubeApiContext.jsx file allows toggling between real API data and mock data for development. To use the real YouTube API, import youtubeClient; for mock data, import fakeYoutubeClient:

```
// YoutubeApiContext.jsx

import { createContext, useContext } from 'react';
import Youtube from '../api/youtube';
// import FakeYoutubeClient from '../api/fakeYoutubeClient';
import YoutubeClient from '../api/youtubeClient';

export const YoutubeApiContext = createContext();

const client = new YoutubeClient(); // Switch to FakeYoutubeClient for mock data
const youtube = new Youtube(client);
```

## Setup and Installation

### 1. Clone the Repository

```
git clone https://github.com/rupertgrint/react-youtube
cd react-youtube
```

### 2. Install Dependencies
```
yarn install
```

### 3. Set Up Environment Variables
To run the app with the YouTube Data API, create a .env file in the project root and add your API key:
```
REACT_APP_YOUTUBE_API_KEY=your_api_key_here
```

### 4. Start the Development Server
```
yarn start
```

## Usage
- **Browse Videos:** The homepage displays popular videos.
- **Search Videos:** Use the search bar in the header to find videos by keyword.
- **Watch and Explore:** Click a video to open the Video Detail page, where related videos are shown.
- **Mock Data Mode:** Use the fake client to test without API limits by switching to FakeYoutubeClient in YoutubeApiContext.jsx.

## Screenshots
- **Home Page:** Shows a list of popular videos.
<img width="1423" alt="Screen Shot 2024-11-05 at 11 04 52 pm" src="https://github.com/user-attachments/assets/3a36c6ef-3381-40a3-bc0a-1cc93c9a361e">


- **Video Detail Page:** Displays the main video, channel info, and related videos.
<img width="1418" alt="Screen Shot 2024-11-05 at 11 05 18 pm" src="https://github.com/user-attachments/assets/b0ba98ea-ddf6-4e07-b3e2-0352712310de">


- **Search Functionality:** Search for videos and get relevant results.
<img width="1426" alt="Screen Shot 2024-11-05 at 11 06 05 pm" src="https://github.com/user-attachments/assets/8ecca119-02a0-4f3e-b9b1-62e336a179ae">


## License
This project is open-source and available under the MIT License.

