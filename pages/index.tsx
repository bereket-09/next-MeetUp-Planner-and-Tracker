import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

// const dummy = [
//   {
//     id: "m1",
//     title: "First meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/6/63/Night_view_of_Meskel_Square.jpg",
//     address: "Hello world address",
//     description: "this is a first meetup",
//   },
//   {
//     id: "m2",
//     title: "ANGULAR meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/6/63/Night_view_of_Meskel_Square.jpg",
//     address: "Hello world address",
//     description: "this is a first meetup",
//   },

//   {
//     id: "m3",
//     title: "NEXT meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/6/63/Night_view_of_Meskel_Square.jpg",
//     address: "Hello world address",
//     description: "this is a first meetup",
//   },
// ];

function HomePage(props: any) {
  return <MeetupList meetups={props.meetups} />;
}

// export async function getServerSideProps(context: any){

//   const req=context.req;
//   const res=context.res;

//   return {
//         props:{
//           meetups:dummy
//         }
//       };
// }

export async function getStaticProps() {
  // fetch data from our API

  const client = await MongoClient.connect(
    "mongodb+srv://nextjs-2022:nextjs2022@cluster0.bmmne.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();
  console.log("🚀 ~ file: index.tsx:60 ~ getStaticProps ~ meetups", meetups);

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup?.data?.title,
        address: meetup?.data?.address,
        image: meetup?.data?.image,
        id: meetup?._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
