import classes from './meetupDetail.module.css'
function MeetupDetails(props){
  console.log("🚀 ~ file: meetupDetail.tsx:3 ~ MeetupDetail ~ props", props)
  
    return (
        <section className={classes.detail}>
          <img src={props?.image} alt="image" />
          <h1>{props?.title}</h1>
          <address>{props?.address}</address>
          <p>{props?.description}</p>
        </section>
      );
}

export default MeetupDetails