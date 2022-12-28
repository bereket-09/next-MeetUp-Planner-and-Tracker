import MeetupDetails from "../../components/meetups/meetupDetail";
import { MongoClient, ObjectId } from "mongodb";

function MeetupDetailsPage(props: any) {
  console.log(
    "🚀 ~ file: index.tsx:5 ~ MeetupDetailsPage ~ props",
    props.meetupData
  );
  return (
    <MeetupDetails
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://nextjs-2022:nextjs2022@cluster0.bmmne.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _ids: 1 }).toArray();

  // console.log("🚀 TEST", meetups);

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        meetUpId: meetup._id.toString(),
      },
    })),
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

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupID),
  });
  // console.log("🚀 TEST", selectedMeetup);

  client.close();

  // console.log("🚀 ~ file: index.tsx:19 ~ getStaticProps ~ meetupId", meetupID);

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.data.title,
        address: selectedMeetup.data.address,
        description: selectedMeetup.data.description,
        image: selectedMeetup.data.image,
      },
    },
  };
}

export default MeetupDetailsPage;
