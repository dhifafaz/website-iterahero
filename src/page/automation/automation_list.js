import React, { useState, useEffect } from "react";
import {
  Text,
  Flex,
  Wrap,
  Button,
  FormControl,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../../component/loading/loading";
import { useNavigate } from "react-router-dom";
import {
  getActuatorDetail,
  getAutomationByActuator,
  updateActuatorDetail,
} from "../../Utility/api_link";
import CardAutomation from "../../component/card Automation/card_automation";

const AutomationList = (props) => {
  const idApi = props.data.id;
  const header = localStorage.getItem("token");
  const navigate = useNavigate();
  const [dataApi, setDataApi] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(0);

  const getAutomation = async () => {
    await axios
      .get(`${getAutomationByActuator}${idApi}`, {
        headers: {
          Authorization: "Bearer " + header,
        },
      })
      .then((response) => {
        setDataApi(response.data.data);
      })
      .catch((error) => {
        localStorage.clear();
        navigate("/login");
      });
  };
  const getActuatorAutomation = async () => {
    await axios
      .get(`${getActuatorDetail}${idApi}`, {
        headers: {
          Authorization: "Bearer " + header,
        },
      })
      .then((response) => {
        setStatus(response.data.data.automation);
      })
      .catch((error) => {
        localStorage.clear();
        navigate("/login");
      });
  };

  const toogleSwitch = () => {
    if (status == 1) {
      setTimeout(() => {
        axios
          .put(
            `${updateActuatorDetail}${parseInt(idApi)}`,
            {
              automation: 0,
            },
            {
              headers: {
                "content-type": "multipart/form-data",
                Authorization: "Bearer " + header,
              },
            }
          )
          .then((response) => {
            setIsLoading(false);
            setStatus((replace) => !replace);
          });
      }, 200);
    } else {
      setTimeout(() => {
        axios
          .put(
            `${updateActuatorDetail}${parseInt(idApi)}`,
            {
              automation: 1,
            },
            {
              headers: {
                "content-type": "multipart/form-data",
                Authorization: "Bearer " + header,
              },
            }
          )
          .then((response) => {
            setIsLoading(false);
            setStatus((replace) => !replace);
          });
      }, 200);
    }
  };

  useEffect(() => {
    getAutomation();
    getActuatorAutomation();
  }, [idApi, status]);

  return (
    <>
      {dataApi == null || isLoading ? (
        <Loading />
      ) : (
        <Wrap w={["100%"]} margin={"0px"}>
          <FormControl
            display="flex"
            alignItems="center"
            justifyContent={"space-between"}
          >
            <FormLabel htmlFor="email-alerts" mb="0">
              <Text
                fontWeight={"semibold"}
                fontSize={"var(--header-3)"}
                color={"var(--color-primer)"}
              >
                Automation
              </Text>
            </FormLabel>
            <Switch
              id="email-alerts"
              onChange={() => {
                setIsLoading(true);
                toogleSwitch();
              }}
              value={status}
              isChecked={status == 1}
            />
          </FormControl>
          <Flex w="100%" flexDir={"column"}>
            <Flex
              w="100%"
              flexDir={"row"}
              justifyContent="center"
              alignItems={"center"}
              marginBottom="20px"
            >
              <Link to={`/unit/dashboard/aktuator/automation/add/${idApi}`}>
                <Button bg="#14453E" size="md" colorScheme={"teal"}>
                  Tambah
                </Button>
              </Link>
            </Flex>
          </Flex>
          <Flex direction={"column"} w={["100%"]} margin={"0px"}>
            {dataApi.map((data) => (
              <CardAutomation
                data={{
                  actuator: data.actuator,
                  sensor: data.sensor,
                  condition: data.condition,
                  status_lifecycle: data.status_lifecycle,
                  constanta: data.constanta,
                  id_automation: data.id_automation,
                }}
              />
            ))}
            ;
          </Flex>
        </Wrap>
      )}
    </>
  );
};
export default AutomationList;
