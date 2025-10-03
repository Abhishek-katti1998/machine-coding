import Swiper from "./components/Carousel/Swiper";
import "./App.css";
function App() {
return<>

<Swiper autoPlay={true} duration={2000}>
  <div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJrT7MI9fsrc6mWRBJBwhrf4vwTL7S5B8CzQ&s" alt="Slide 1" /></div>
  <div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTaYVG_iCjqtC3bXEKrVyw1a1VUNpkA7fViw&s" alt="Slide 2" /></div>
  <div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqiW0KMsGsZHuve8dnIUxU9lM_OUYxnwUlmg&s" alt="Slide 3" /></div>
  <div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2m5lrUnvYTjtpAQlMry8arqTYivCPiRYfkA&s" alt="Slide 4" /></div>
</Swiper>


</> 
}

export default App;
