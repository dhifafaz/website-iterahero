import React, { useState, useEffect } from "react";
import {
	Flex,
	Image,
	Text,
	Input,
	Circle,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Select,
} from "@chakra-ui/react";
import Loading from "../../component/loading/loading";
import * as yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { routePageName } from "../../redux/action";
import { TabTitle } from "../../Utility/utility";
import { updateActuatorDetail, icons } from "../../Utility/api_link";
import axios from "axios";

const Controlling_Edit = () => {
	TabTitle("Edit Aktuator - ITERA Hero");
	const location = useLocation();
	const navigate = useNavigate();
	const data = location.state?.data;
	console.log(data);
	const header = localStorage.getItem("token");
	const [iconSelected, setIconSelected] = useState("");

	const [isloading, checkLoading] = useState(false);

	const schema = yup.object({
		name: yup.string().required("Nama harus diisi"),
		icon: yup.string().required("Ikon harus diisi"),
		color: yup.string().required("Warna harus diisi"),
	});

	const dispatch = useDispatch();

	const putActuator = async (valueName, valueIcon, valueColor) => {
		await axios
			.put(
				updateActuatorDetail + data.id,
				{
					name: valueName,
					icon: valueIcon,
					color: valueColor,
				},
				{
					headers: {
						"content-type": "multipart/form-data",
						Authorization: "Bearer " + header,
					},
				}
			)
			.then((response) => {
				console.log(response);
				checkLoading(false);
				navigate("/unit/controlling");
				alert("Data Aktuator Berhasil Diperbaharui");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const [iconsList, setIconsList] = useState(null);
	const getIcon = async () => {
		axios
			.get(icons)
			.then((response) => {
				console.log("isi response", response);
				setIconsList(response.data.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	let dataSend = {
		name: "",
		icon: "",
		color: "",
	};

	const submit = async (name, color, icon) => {
		dataSend.name = name;
		dataSend.color = color;
		dataSend.icon = icon;

		if (dataSend.name == "" || dataSend.icon == "" || dataSend.color == "") {
			return alert("Masih ada yang belum di isi");
		} else {
			checkLoading(true);
			putActuator(name, icon, color);
		}
	};

	console.log("hallo", iconsList);

	useEffect(() => {
		dispatch(routePageName("Controlling"));
		getIcon();
	}, []);

	return (
		<>
			{iconsList == null || isloading ? (
				<Loading />
			) : (
				<Flex w="100%" flexDir={"column"}>
					<Flex width="100%">
						<Link to={"/unit/controlling"}>
							<Flex marginRight={"2"}>
								<Text
									fontWeight={"semibold"}
									fontSize={"var(--header-3)"}
									color={"var(--color-primer)"}>
									List Controlling pada Greenhouse
								</Text>
							</Flex>
						</Link>

						<Flex marginRight={"2"}>
							<Text
								fontWeight={"semibold"}
								fontSize={"var(--header-3)"}
								color={"var(--color-primer)"}>
								{" "}
								{">"}{" "}
							</Text>
						</Flex>

						<Flex>
							<Text
								fontWeight={"semibold"}
								fontSize={"var(--header-3)"}
								color={"var(--color-primer)"}>
								{" "}
								Edit {data.name}{" "}
							</Text>
						</Flex>
					</Flex>
					<Formik
						initialValues={{
							name: data.name,
							icon: data.icon,
							color: data.color,
						}}
						validationSchema={schema}>
						{({
							values,
							errors,
							touched,
							handleChange,
							setFieldValue,
							handleBlur,
						}) => (
							<Form>
								<FormControl
									marginTop={"20px"}
									isInvalid={errors.name && touched.name}>
									<FormLabel color={"var(--color-primer)"}>Nama</FormLabel>
									<Input
										color={"var(--color-primer)"}
										maxWidth={"100%"}
										marginTop={"0 auto"}
										type="text"
										name="name"
										value={values.name}
										onChange={handleChange}
										onBlur={handleBlur}
										variant="outline"
										placeholder="Nama..."
									/>
									<FormErrorMessage>{errors.name}</FormErrorMessage>
								</FormControl>
								<FormControl
									marginTop={"20px"}
									isInvalid={errors.icon && touched.icon}>
									<FormLabel color={"var(--color-primer)"}>Ikon</FormLabel>
									<Select
										color={"var(--color-primer)"}
										onChange={(e) => {
											setFieldValue("icon", e.target.value);
											setIconSelected(e.target.value);
										}}
										onBlur={handleBlur}
										value={values.icon}
										name="icon"
										id="icon">
										<option value="">Pilih Ikon</option>
										{iconsList.map((item) =>
											item.type == "actuator" ? (
												<option value={item.icon} color={"var(--color-primer)"}>
													{item.name}
												</option>
											) : null
										)}
									</Select>
									<Flex m={"15px"}>
										{iconSelected == "" ? (
											<Image src={data.icon} />
										) : (
											<Image src={iconSelected} />
										)}
									</Flex>
									<FormErrorMessage>{errors.icon}</FormErrorMessage>
								</FormControl>
								<FormControl
									marginTop={"20px"}
									isInvalid={errors.color && touched.color}>
									<FormLabel color={"var(--color-primer)"}>Warna</FormLabel>
									<Select
										color={"var(--color-primer)"}
										maxWidth={"100%"}
										marginTop={"0 auto"}
										type="text"
										name="color"
										value={values.color}
										onChange={handleChange}
										onBlur={handleBlur}
										variant="outline">
										<option value="">Pilih Warna</option>
										{iconsList.map((item) =>
											item.type == "actuator" && item.icon == iconSelected ? (
												<option
													value={item.color}
													color={"var(--color-primer)"}
													selected>
													{item.name}
												</option>
											) : null
										)}
									</Select>
									<Flex m={"15px"}>
										<Circle bg={values.color} size="30px" />
									</Flex>
									<FormErrorMessage>{errors.color}</FormErrorMessage>
								</FormControl>
								<Link to={"/unit/controlling"}>
									<Button
										marginTop={"44px"}
										width="100%"
										height="50px"
										borderRadius="10px"
										backgroundColor="var(--color-primer)"
										type="submit"
										className="btn-login"
										// disabled={isSubmitting}
										onClick={() =>
											submit(values.name, values.color, values.icon)
										}>
										<Text
											fontWeight="bold"
											fontFamily="var(--font-family-secondary)"
											fontSize="var(--header-3)"
											color="var(--color-on-primary)">
											Simpan
										</Text>
									</Button>
								</Link>
							</Form>
						)}
					</Formik>
				</Flex>
			)}
		</>
	);
};
export default Controlling_Edit;
