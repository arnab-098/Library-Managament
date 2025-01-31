import MasonryLayout from "@/components/MasonryLayout";
import NoResults from "@/components/NoResults";
import { Pdf } from "@/types";
import axios from "axios";
import { BASE_URL } from "@/utils";

interface IProps {
  magazines: Pdf[];
}

const Search = ({ magazines }: IProps) => {
  return (
    <div>
      {magazines.length ? (
        <MasonryLayout pdfs={magazines} />
      ) : (
        <NoResults text={"No magazines found"} />
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const response = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: { magazines: response.data },
  };
};

export default Search
