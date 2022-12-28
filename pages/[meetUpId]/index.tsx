import MeetupDetail from "../../components/meetups/meetupDetail";
import { MongoClient ,ObjectId} from "mongodb";

function MeetupDetailsPage(props:any) {
  return (
    <MeetupDetail
      image={props.image}
      title={props.title}
      address={props.address}
      description={props.description}
    />
  );
}

export async function getStaticPaths() {

  const client = await MongoClient.connect(
    "mongodb+srv://nextjs-2022:nextjs2022@cluster0.bmmne.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, {_ids: 1}).toArray();

  console.log("🚀 TEST", meetups);

  client.close();


  return {
    fallback: false,
    paths: meetups.map(meetup=>({
      params: {
        meetUpId: meetup._id.toString(),
      },
    }))
    
  };
}

export async function getStaticProps(context: any) {
  //fetch data for a single meetup

  
  const meetupID = context.params.meetUpId;
  
  const client = await MongoClient.connect(
    "mongodb+srv://nextjs-2022:nextjs2022@cluster0.bmmne.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup=await meetupsCollection.findOne({_id: ObjectId(meetupID)})
  console.log("🚀 TEST", selectedMeetup);

  client.close();


  console.log("🚀 ~ file: index.tsx:19 ~ getStaticProps ~ meetupId", meetupID);

  return {
    props: {
      meetupData: selectedMeetup
    },
  };
}

export default MeetupDetailsPage;
