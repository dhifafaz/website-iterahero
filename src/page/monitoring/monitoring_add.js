import React, { useState, useEffect } from 'react'
import {
    Flex,
    Image,
    Box,
    Center,
    Text,
    Input,
    Icon,
    calc,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Select,
} from '@chakra-ui/react'

import * as yup from "yup"
import { Link } from "react-router-dom";
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { routePageName } from '../../redux/action';

const schema = yup.object({
    nama: yup
        .string()
        .required("Nama harus diisi"),
    ikon: yup
        .string()
        .required("Ikon harus diisi"),
    satuan_ukur: yup
        .string()
        .required("Satuan Ukur harus diisi"),
    merek: yup
        .string()
        .required("Merek harus diisi"),
    kategori: yup
        .string()
        .required("Kategori harus diisi"),
})
const Monitoring_Add = () => {
    const [ikon, setIkon] = useState(
        [
            {
                id: 1,
                nama: 'Ikon 1',
                ikon: 'https://res.cloudinary.com/diyu8lkwy/image/upload/v1663229870/itera%20herro%20icon/Lovepik_com-400222655-test-tube_1_jhq5uo.png',
                warna: 'red',
                kategori: 'Persen',
            },
            {
                id: 2,
                nama: 'Ikon 2',
                ikon: 'https://res.cloudinary.com/diyu8lkwy/image/upload/v1663229870/itera%20herro%20icon/Lovepik_com-400222655-test-tube_1_jhq5uo.png',
                warna: 'red',
                kategori: 'Persen',
            },
        ]
    )
    const [ikon_selected, setIkon_selected] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(routePageName('Monitoring'))
        };
    }, []);

    return (
        <Flex
            w='100%'
            flexDir={'column'}
        >
            <Flex width='100%' >
                <Link to={'/unit/monitoring'}>
                    <Flex marginRight={'2'}>
                        <Text fontWeight={'semibold'} fontSize={'var(--header-3)'} color={'var(--color-primer)'}>
                            List Sensor pada Greenhouse
                        </Text>
                    </Flex>
                </Link>
                <Flex marginRight={'2'}>
                    <Text fontWeight={'semibold'} fontSize={'var(--header-3)'} color={'var(--color-primer)'}> {'>'} </Text>
                </Flex>
                <Link>
                    <Flex>
                        <Text fontWeight={'semibold'} fontSize={'var(--header-3)'} color={'var(--color-primer)'}> Add </Text>
                    </Flex>
                </Link>
            </Flex>
            <Formik
                initialValues={{
                    nama: '',
                    ikon: '',
                    satuan_ukur: '',
                    merek: '',
                    kategori: '',
                }
                } validationSchema={schema}
                onSubmit={(values) => {
                    console.log(JSON.stringify(values, null, 2))
                }}
            >
                {({ values,
                    errors,
                    touched,
                    handleChange,
                    setFieldValue,
                    handleBlur,
                    handleSubmit,
                    isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>
                        <FormControl marginTop={'20px'} isInvalid={errors.nama && touched.nama}>
                            <FormLabel color={'var(--color-primer)'} >
                                Nama
                            </FormLabel>
                            <Input
                                color={'var(--color-primer)'}
                                maxWidth={'100%'}
                                marginTop={'0 auto'}
                                type="text"
                                name="nama"
                                value={values.nama}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant='outline'
                                placeholder="Nama..." />
                            <FormErrorMessage>
                                {errors.nama}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl marginTop={'20px'} isInvalid={errors.ikon && touched.ikon}>
                            <FormLabel color={'var(--color-primer)'}>
                                Ikon
                            </FormLabel>
                            <Select color={'var(--color-primer)'}
                                onChange={(e) => {
                                    setFieldValue('ikon', e.target.value);
                                    setIkon_selected(e.target.value)
                                }}
                                onBlur={handleBlur}
                                value={ikon.ikon}
                                name="ikon"
                                id="ikon">
                                <option value="" selected>
                                    Pilih Ikon
                                </option>
                                {ikon.map((ikon) => (
                                    <option value={ikon.ikon} color={'var(--color-primer)'}>
                                        {ikon.nama}
                                    </option>
                                )
                                )
                                }
                            </Select>
                            <Image src={ikon_selected} />
                            <FormErrorMessage>
                                {errors.ikon}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl marginTop={'20px'} isInvalid={errors.satuan_ukur && touched.satuan_ukur}>
                            <FormLabel color={'var(--color-primer)'}>
                                Satuan Ukur
                            </FormLabel>
                            <Input
                                color={'var(--color-primer)'}
                                maxWidth={'100%'}
                                marginTop={'0 auto'}
                                type="text"
                                name="satuan_ukur"
                                value={values.satuan_ukur}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant='outline'
                                placeholder="Satuan Ukur..." />
                            <FormErrorMessage>
                                {errors.satuan_ukur}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl marginTop={'20px'} isInvalid={errors.merek && touched.merek}>
                            <FormLabel color={'var(--color-primer)'}>
                                Merek
                            </FormLabel>
                            <Input
                                color={'var(--color-primer)'}
                                maxWidth={'100%'}
                                marginTop={'0 auto'}
                                type="text"
                                name="merek"
                                value={values.merek}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant='outline'
                                placeholder="Merek..." />
                            <FormErrorMessage>
                                {errors.merek}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl marginTop={'20px'} isInvalid={errors.ikon && touched.ikon}>
                            <FormLabel color={'var(--color-primer)'}>
                                kategori
                            </FormLabel>
                            <Select value={ikon.kategori} color={'var(--color-primer)'} onChange={handleChange}
                                onBlur={handleBlur}
                                name="kategori"
                                id="kategori"
                            >
                                <option value="">
                                    Pilih Kategori
                                </option>
                                {ikon.map((ikon) => (
                                    <option color={'var(--color-primer)'}>
                                        {ikon.kategori}
                                    </option>
                                ))}
                            </Select>
                            <FormErrorMessage>
                                {errors.kategori}
                            </FormErrorMessage>
                        </FormControl>
                        <Link to={'/unit/monitoring'}>
                            <Button
                                marginTop={'44px'}
                                width="100%"
                                height="50px"
                                borderRadius="10px"
                                backgroundColor="var(--color-primer)"
                                type="submit"
                                className="btn-login"
                                disabled={isSubmitting}
                                onClick={handleSubmit}
                            >
                                <Text fontWeight='bold' fontFamily='var(--font-family-secondary)' fontSize='var(--header-3)' color='var(--color-on-primary)'>
                                    Tambah
                                </Text>
                            </Button>
                        </Link>
                    </Form>
                )}
            </Formik>
        </Flex>
    )
}
export default Monitoring_Add