import Tasks from "./Tasks";

function Home(props) {
  return (
    <>
    <div>

      <Tasks showAlert={props.showAlert} />
    </div>
      
    </>
  );
}

export default Home;