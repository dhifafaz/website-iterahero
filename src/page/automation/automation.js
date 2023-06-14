import React, { useState, useEffect } from "react";
import { Text, Button, Flex, Wrap } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../component/loading/loading";
import { TabTitle } from "../../Utility/utility";
import { useNavigate } from "react-router";
import { getActuatorDetail } from "../../Utility/api_link";
import dashboardControlMenu from "../../Utility/dashboard_control_menu";
import CardLogActuator from "../../component/card_log_actuator/card_log_act";
import CardSensor from "../../component/card_sensor/card_sensor";


const Automation = () => {
  TabTitle("Detail Actuator - ITERA Hero");
  const [data, setData] = useState("");
  const [dataApi, setDataApi] = useState(null);
  const [selected, setSelected] = useState(1);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const getActuator = async () => {
    setIsLoading(true);
    const header = localStorage.getItem("token");
    await axios
      .get(`${getActuatorDetail}${id}`, {
        headers: {
          Authorization: "Bearer " + header,
        },
      })
      .then((response) => {
        setDataApi(response.data.data.name);
        setIsLoading(false);
      })
      .catch((error) => {
        localStorage.clear();
        navigate("/login");
      });
  };

  useEffect(() => {
    getActuator();
  }, [id, data]);

  return (
    <>
      {dataApi == null ? (
        <Loading />
      ) : (
        <>
          <Flex bg="white" borderRadius="10px" p="10px">
            <Flex>
              <Link to="/unit/dashboard">
                <Text fontSize="20px" fontWeight="bold" mr="10px">
                  Dashboard
                </Text>
              </Link>
            </Flex>
            <Flex>
              <Text fontSize="20px" fontWeight="bold" mr="10px">
                {">"}
              </Text>
            </Flex>
            <Text fontSize="20px" fontWeight="bold" mb="10px">
              {"Aktuator " + dataApi}
            </Text>
          </Flex>
          <Flex>
            <Flex width={"100%"}>
              <Wrap flexDir={"row"}>
                {dashboardControlMenu.map((item, index) => {
                  return (
                    <Flex key={index} width={"169px"} height={"44px"}>
                      <Button
                        onClick={() => setSelected(item.id)}
                        w="100%"
                        height={"100%"}
                        borderRadius={"16"}
                        border={
                          selected == item.id
                            ? null
                            : "1px solid var(--color-primer)"
                        }
                        bg={
                          selected == item.id
                            ? "var(--color-primer)"
                            : "var(--color-on-primary)"
                        }
                        flexDir={"row"}
                        alignContent={"center"}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <Text
                          fontWeight={"semibold"}
                          color={
                            selected == item.id
                              ? "var(--color-surface)"
                              : "var(--color-on-background"
                          }
                          size={"var(--header-3)"}
                        >
                          {item.name}
                        </Text>
                      </Button>
                    </Flex>
                  );
                })}
              </Wrap>
            </Flex>
          </Flex>
          <Flex>
              <Wrap justify={'center'}>
                {
                selected === 1? <CardSensor data={{id : id}}/> :  <CardLogActuator data={{id : id}}/>
                }
              </Wrap>
            </Flex>
        </>
      )}
    </>
  );
};
export default Automation;
