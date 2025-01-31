import axios from "axios";
import { Pdf } from "@/types";
import NoResults from "@/components/NoResults";
import MasonryLayout from "@/components/MasonryLayout";
import { BASE_URL } from "@/utils";

interface IProps {
  magazines: Pdf[];
}

const Home = ({ magazines }: IProps) => {
  return (
    <div>
      {magazines.length ? (
        <MasonryLayout pdfs={magazines} />
      ) : (
        <NoResults text={"No magazines of this category"} />
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = await axios.get(`${BASE_URL}/api/post`);

  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  }

  return {
    props: { magazines: response.data },
  };
};

export default Home;
