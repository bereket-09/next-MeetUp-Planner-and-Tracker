import MeetupDetail from "../../components/meetups/meetupDetail";
import { MongoClient } from "mongodb";

function MeetupDetailsPage() {
  return (
    <MeetupDetail
      image="https://upload.wikimedia.org/wikipedia/commons/6/63/Night_view_of_Meskel_Square.jpg"
      title="first Meetup"
      address="somewhere in AA"
      description="some desctiopitn"
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
  console.log("🚀 ~ file: index.tsx:19 ~ getStaticProps ~ meetupId", meetupID);

  return {
    props: {
      meetupData: {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/6/63/Night_view_of_Meskel_Square.jpg",
        id: meetupID,
        title: "Night View of",
        address: "Meskel Square",
        description: "Night",
      },
    },
  };
}

export default MeetupDetailsPage;
