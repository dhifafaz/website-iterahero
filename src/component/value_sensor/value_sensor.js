import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Text,
  Button,
  Select,
  Tr,
  Image,
  Th,
  Td,
  Box,
  TableContainer,
  Flex,
  Wrap,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import axios from "axios";
import { brokerSensor } from "../..//Utility/api_link";
import Loading from "../../component/loading/loading";
import { useNavigate } from "react-router-dom";
import { buildStyles } from "react-circular-progressbar";
import moment from "moment/moment";
import "./value_sensor.css";
import mqtt from "mqtt/dist/mqtt";

const ValueSensor = (props) => {
  const option = {
    clientId: `mqttItera_${Math.random().toString(16).slice(3)}`,
    keepalive: 30,
    protocolVersion: 4,
    clean: true,
    connectTimeout: 30 * 1000,
    rejectUnauthorized: false,
    reconnectPeriod: 1000,
  };
  const host = `ws://broker.mqttdashboard.com:8000/mqtt`;
  const idSensor = props.data.id;
  const color = props.data.color;
  const kategori = props.data.category;
  const satuan = props.data.unit;
  const max = props.data.max;
  const min = props.data.min;
  const navigate = useNavigate();
  const [valueSensor, setValueSensor] = useState(0);
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("");
  const [client, setclient] = useState(null);
  const connect = () => {
    if (client == null) {
      const clientConnect = mqtt.connect(host, option);
      setclient(clientConnect);
    }
  };
  const getData = async () => {
    if (client) {
      await client.on("connect", () => {
        console.log("test");
        client.subscribe("iterahero/test");
      });
      await client.on("message", async (topic, message) => {
        let parsing = await JSON.parse(message.toString());
        const date = new Date();
        parsing.map(async (data) => {
          if (data.id_sensor == idSensor) {
            setValueSensor(data.value);
            setStatus(data.status);
            setTime(date);
          }
        });
      });
    }
  };
  const disconnect = () => {
    if (client) {
      client.end();
    }
  };

  useEffect(() => {
    connect();
    getData();

    return () => {
      disconnect();
    };
  }, [client]);

  return (
    <>
      <Flex
        alignContent={"center"}
        justify={"center"}
        flexDir={"column"}
        alignItems={"center"}
      >
        {kategori == "Persen" ? (
          <Flex
            flexDir={"column"}
            justify={"center"}
            alignItems={"center"}
            textAlign="center"
            mb={"5px"}
            mt={"10px"}
            style={{ width: "100px" }}
          >
            <Flex>
              <CircularProgress
                value={valueSensor}
                color={
                  valueSensor > max || valueSensor < min
                    ? "var(--color-error)"
                    : `${color}`
                }
                size="70px"
              >
                <CircularProgressLabel>{valueSensor}%</CircularProgressLabel>
              </CircularProgress>
            </Flex>
            <Flex
              width={"130px"}
              mt={"10px"}
              flexDir={"row"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text
                width={"100%"}
                fontSize={"12px"}
                fontWeight={"bold"}
                color={"var(--color-primer)"}
              >
                Status :
              </Text>
              {status == null && status == undefined ? (
                <Text
                  width={"100%"}
                  fontSize={"12px"}
                  fontWeight={"bold"}
                  color={"var(--color-primer)"}
                >
                  Offline
                </Text>
              ) : (
                <Text
                  width={"100%"}
                  ml={"-20px"}
                  fontSize={"12px"}
                  fontWeight={"bold"}
                  color={
                    status == "offline" || status == undefined || status == ""
                      ? "var(--color-error)"
                      : `var(--color-secondary-variant)`
                  }
                >
                  {status == "offline" || status == undefined || status == ""
                    ? "Offline"
                    : "Online"}
                </Text>
              )}
            </Flex>
          </Flex>
        ) : null}
        {kategori == "Derajat" ? (
          <Flex
            justify={"center"}
            mb={"10px"}
            mt={"10px"}
            flexDir={"column"}
            alignItems={"center"}
            textAlign="center"
            style={{ width: "50px" }}
          >
            {
              <>
                <Text
                  fontSize={"20px"}
                  color={
                    valueSensor > max || valueSensor < min
                      ? "var(--color-error)"
                      : `${color}`
                  }
                >
                  {valueSensor}°
                </Text>
                <Text
                  fontSize={"20px"}
                  color={
                    valueSensor > max || valueSensor < min
                      ? "var(--color-error)"
                      : `${color}`
                  }
                >
                  {satuan}
                </Text>
              </>
            }
            <Flex
              width={"130px"}
              mt={"10px"}
              flexDir={"row"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text
                width={"100%"}
                fontSize={"12px"}
                fontWeight={"bold"}
                color={"var(--color-primer)"}
              >
                Status :
              </Text>
              {status == null && status == undefined ? (
                <Text
                  width={"100%"}
                  fontSize={"12px"}
                  fontWeight={"bold"}
                  color={"var(--color-error)"}
                >
                  Offline
                </Text>
              ) : (
                <Text
                  width={"100%"}
                  ml={"-20px"}
                  fontSize={"12px"}
                  fontWeight={"bold"}
                  color={
                    status == "offline" || status == undefined || status == ""
                      ? "var(--color-error)"
                      : `var(--color-secondary-variant)`
                  }
                >
                  {status == "offline" || status == undefined || status == ""
                    ? "Offline"
                    : "Online"}
                </Text>
              )}
            </Flex>
          </Flex>
        ) : null}
        {kategori == "Lainnya" ? (
          <Flex
            justify={"center"}
            mb={"10px"}
            mt={"10px"}
            flexDir={"column"}
            alignItems={"center"}
            textAlign="center"
            style={{ width: "50px" }}
          >
            {
              <>
                <Text
                  fontSize={"20px"}
                  color={
                    valueSensor > max || valueSensor < min
                      ? "var(--color-error)"
                      : `${color}`
                  }
                >
                  {valueSensor}
                </Text>
                <Text
                  fontSize={"20px"}
                  color={
                    valueSensor > max || valueSensor < min
                      ? "var(--color-error)"
                      : `${color}`
                  }
                >
                  {satuan}
                </Text>
              </>
            }
            <Flex
              width={"130px"}
              mt={"10px"}
              flexDir={"row"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text
                width={"100%"}
                fontSize={"12px"}
                fontWeight={"bold"}
                color={"var(--color-primer)"}
              >
                Status :
              </Text>
              {status == null && status == undefined ? (
                <Text
                  width={"100%"}
                  fontSize={"12px"}
                  fontWeight={"bold"}
                  color={"var(--color-error)"}
                >
                  Offline
                </Text>
              ) : (
                <Text
                  width={"100%"}
                  ml={"-20px"}
                  fontSize={"12px"}
                  fontWeight={"bold"}
                  color={
                    status == "offline" || status == undefined || status == ""
                      ? "var(--color-error)"
                      : `var(--color-secondary-variant)`
                  }
                >
                  {status == "offline" || status == undefined || status == ""
                    ? "Offline"
                    : "Online"}
                </Text>
              )}
            </Flex>
          </Flex>
        ) : null}
        {
          <Flex flexDir={"row"} justifyContent={"space-between"}>
            <Text fontSize={"var(--caption)"}>Diperbarui : </Text>
            <Text fontSize={"var(--caption)"}>
              {moment(time).format("MMMM Do YYYY, h:mm:ss a")}
            </Text>
          </Flex>
        }
      </Flex>
    </>
  );
};
export default ValueSensor;
