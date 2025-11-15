import axios from 'axios' //Импортируем библиотеку axios, чтобы делать HTTP-запросы.

const api = axios.create({
  baseURL: 'http://localhost:1337/api', //Создаём преднастроенный axios-клиент, чтобы не писать полный URL каждый раз. Все запросы будут отправляться сюда.
  //baseURL: 'https://api.45case.ru/api',
})

interface QueryObject {
  //Определяем объект, который будет содержать любые ключи для ?populate=... и т.п.
  [key: string]: any
}

const buildQueryString = (params: QueryObject, prefix = ''): string => {
  //Начало функции, которая превращает JS-объект в строку запроса.
  const queryString = Object.keys(params)
    .map((key) => {
      //Обрабатываем каждый ключ
      const param = params[key]
      if (typeof param === 'object' && !Array.isArray(param)) {
        //Если значение — объект, рекурсивно строим вложенные параметры
        return buildQueryString(param, `${prefix}[${encodeURIComponent(key)}]`)
      } else if (Array.isArray(param)) {
        //Если значение — массив
        return param
          .map(
            (item, index) =>
              `${prefix}[${encodeURIComponent(key)}][${index}]=${encodeURIComponent(item)}`,
          )
          .join('&')
      } else {
        //Если обычное значение (строка, число)
        return `${prefix}[${encodeURIComponent(key)}]=${encodeURIComponent(param)}`
      }
    })
    .join('&') //Собираем всю строку
  return queryString
}

const cache = new Map<string, any>() //Создаём кеш

export const fetchData = async (endpoint: string, query: QueryObject) => {
  //Основная функция — GET-запрос
  try {
    //Генерируем query-строку и ключ кеша
    const queryString = buildQueryString(query)
    const cacheKey = `${endpoint}?${queryString}`

    // Проверяем наличие данных в кеше
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey)
    }

    // Если данных нет, выполняем запрос
    const response = await api.get(`${endpoint}?${queryString}`)
    const data = response.data

    // Сохраняем данные в кеш
    cache.set(cacheKey, data)

    // Удаляем данные из кеша через определённое время (например, 5 минут)
    setTimeout(() => cache.delete(cacheKey), 1000 * 60 * 5)

    return data //Возвращаем данные
  } catch (error) {
    //Обработка ошибок
    console.error('Error fetching:', error)
    throw error
  }
}

export const postData = async (endpoint: string, data: any) => {
  //POST-запрос
  try {
    const response = await api.post(endpoint, data, {
      //POST с JSON
      headers: {
        'Content-Type': 'application/json', // Указываем Content-Type
      },
    })
    return response.data //Возвращаем ответ
  } catch (error) {
    //Обработка ошибок POST
    console.error('Error fetching:', error)
    throw error
  }
}
