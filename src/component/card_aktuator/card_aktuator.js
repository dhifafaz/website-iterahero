import React, { useState, useEffect } from "react";
import { Text, Image, Flex, Wrap, WrapItem, Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { paginationAktuator } from "../..//Utility/api_link";
import Loading from "../../component/loading/loading";
import { useNavigate } from "react-router-dom";
import "./card_aktuator.css";
import ValueAktuator from "../value_aktuator/value_aktuator";

const CardAktuator = (props) => {
  const idApi = props.data.id;
  const navigate = useNavigate();
  const [dataTable, setDataTable] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getPagination = async () => {
    setIsLoading(true);

    const header = localStorage.getItem("token");
    await axios
      .get(`${paginationAktuator}${idApi}&&size=100`, {
        headers: {
          Authorization: "Bearer " + header,
        },
      })
      .then((response) => {
        setDataTable(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        localStorage.clear();
        navigate("/login");
      });
  };

  useEffect(() => {
    getPagination();
    setIsLoading(true);
  }, [idApi]);
  return (
    <>
      {dataTable == null || isLoading ? (
        <Loading />
      ) : (
        <Flex>
          <Flex align={"center"} justify={"center"} mt={"30px"}>
            <Wrap
              className="center-ul"
              align={"center"}
              spacing={"30px"}
              mt={"30px"}
            >
              {dataTable.map((item, index) => (
                <Link to={`/unit/dashboard/aktuator/${item.id}`} key={index}>
                  <WrapItem
                    className="hiya"
                    key={index}
                    w={{ base: "90vw", md: "sm" }}
                    bg={"#ffff"}
                    borderRadius={"10px"}
                    border={"1px solid #E2E8F0"}
                    paddingTop={"30px"}
                    paddingBottom={"30px"}
                  >
                    <Center
                      justifyContent={"center"}
                      flexDir={"column"}
                      data={{ data: idApi }}
                    >
                      <Flex flexDir={"row"} justify={"space-between"}>
                        <Image
                          size={5}
                          src={`${item.icon}`}
                          color={item.color}
                        />
                        <Text color={`${item.color}`}>{item.name}</Text>
                      </Flex>
                      <Flex flexDir={"column"} justify={"center"}>
                        <Link to={`#`}>
                          <ValueAktuator
                            data={{
                              id: item.id,
                              life_cycle: item.status_lifecycle,
                              automation: item.automation,
                            }}
                          />
                        </Link>
                      </Flex>
                    </Center>
                  </WrapItem>
                </Link>
              ))}
            </Wrap>
          </Flex>
        </Flex>
      )}
    </>
  );
};
export default CardAktuator;
