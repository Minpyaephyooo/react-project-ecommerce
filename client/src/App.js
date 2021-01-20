// import React, { useEffect, useRef } from "react";
// import lottie from "lottie-web";

// function App() {
//   const container = useRef(null);

//   useEffect(() => {
//     lottie.loadAnimation({
//       container: container.current,
//       renderer: "svg",
//       // loop: true,
//       autoplay: true,
//       animationData: require("./image.json"),
//     });
//   });
//   return (
//     <div className="App">
//       <div
//         className="container"
//         ref={container}
//         style={{width: '50%', height: '80%'}}
//       ></div>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { DataProvider } from "./GlobalState";
import Header from './components/headers/Header';
import MainPages from './components/mainpages/Page'

const App = () => {
  return (
    <DataProvider>
      <Router>
        <Header />
        <MainPages />
      </Router>
    </DataProvider>
  );
};

export default App;
