import {
    Container,
    Stack,
    Heading,
    Text,
  } from '@chakra-ui/react';
import Ucatalog from './Ucatalog';
  
  export default function Intro() {
    return (
      <Container maxW={'7xl'} className = "container">
        <Stack
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: 'column', md: 'row' }}>
          <Stack p={10} flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={700}
              fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: '30%',
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'red.400',
                  zIndex: -1,
                }}>
                Образование
              </Text>
              <br />
              <Text as={'span'} color={'red.400'}>
                в Кыргызстане
              </Text>
            </Heading>
            <Text 
              color={'gray.500'}
              fontSize={{ base: 'lg', sm: 'xl', lg: '2xl' }}
              >
               На FindU.kg вы найдете всю информацию о высшем образовании.<br/>
               В нашем каталоге представлены все вузы в Бишкеке и в КР. 
               Поиск учебных заведений по направлениям обучения, каталог специальностей, расписание вступительных, бюджетные места и проходные баллы, — всю эту информацию вы найдете на нашем сайте. 
               Вы можете выбрать интересующую вас специальность, узнать стоимость обучения и условия поступления, ознакомиться с вариантами дистанционного или заочного обучения, выбрать куда можно пойти учиться после 9 или 11 классов.
              All that is free!
            </Text>
          </Stack>
        </Stack>
      </Container>
    );
  }
  