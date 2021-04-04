import React from "react";
import axios from "axios";
import {
  Container,
  Card,
  Pagination,
  Image,
  Header,
  Segment
} from "semantic-ui-react";
import "./styles.css";

const { useState, useEffect } = React;

interface Name {
  title: string;
  first: string;
  last: string;
}

interface Location {
  city: string;
  country: string;
}

interface Picture {
  thumbnail: string;
}

interface UserInfo {
  name: Name;
  location: Location;
  picture: Picture;
}

const fetchData = async (pageNumber: number) => {
  try {
    const URL = `https://randomuser.me/api?page=${pageNumber}`;
    const { data } = await axios.get(URL);
    return data.results;
  } catch (err) {
    console.error(`GET ${err.message}`);
  }
};

export default function App() {
  const [userInfo, setUserInfo] = useState<Array<UserInfo>>([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    fetchData(pageNumber).then((results) => {
      setUserInfo(results);
    });
  }, [pageNumber]);

  const getUserName = (item: UserInfo) => {
    const {
      name: { title, first, last }
    } = item;
    return `${title} ${first} ${last}`;
  };

  const getUserDescription = (item: UserInfo) => {
    const {
      location: { city, country }
    } = item;
    return `${city}, ${country}`;
  };

  return (
    <div className="App">
      <Segment inverted>
        <Header as="h1">Let's display user information</Header>
      </Segment>
      <Container fluid>
        <Pagination
          onPageChange={(e, { activePage }: any) => {
            setPageNumber(activePage);
          }}
          defaultActivePage={1}
          totalPages={10}
        />
        <Card raised centered>
          {userInfo.map((item: UserInfo, idx: number) => (
            <React.Fragment key={idx}>
              <Image src={item.picture.thumbnail} />
              <Card.Content>
                <Card.Header>{getUserName(item)}</Card.Header>
                <Card.Description>{getUserDescription(item)}</Card.Description>
              </Card.Content>
            </React.Fragment>
          ))}
        </Card>
      </Container>
    </div>
  );
}
