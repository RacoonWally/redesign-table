Пример объемной задачи которую делал на текущей работе.

В качестве примера выбрал задачу по полному редизайну существующих таблиц на всем проекте.
Задачу вел в одиночку от начала и до конца.

По понятным причинам без остального проекта ее просто так не запустить.
Так же удалены все импорты.

В общих чертах задача сделать новую красивую таблицу, и прилегающий к ней функционал в виде разнличных управляющих элементов.
Т.к. прошлая таблица была не идеальна и каждая ее встройка в новое место требовала значительное количество кода, в том числе от раза к разу требовался функционал создания, редактирования, различные управляющие контролы итп.
Принял решение максимально шаблонизировать создание таблицы и добавлять к ней различные элементы по средставам конфигурации.
Часть нетиповых решений пришлось хардкодить как супер специфические элементы но таких крайне мало, в подавляющем большинстве все переиспользуется. 
На выходе получилось создать решение которое значительно упрощает разработку и сокращает сроки создания таблицы от в среднем 3 дней до 1 - 1.5 дней.

В папке Table представлена таблица и управляющие элементы.
В папке example представлен пример того как она применяется на странице.

В CommonExamplePage находятся переиспользуемые хуки.
