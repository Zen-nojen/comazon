- product 쿼리 파라미터 적용

  - order: 데이터 정렬, 이때 order에 값을 따로 지정해 주지 않으면, 기본적으로 newest를 기본 값으로 사용하게 됩니다.
    - priceLowest: 가격 기준 오름차순 정렬
    - priceHighest: 가격 기준 내림차순 정렬 ( 기본 값 )
  - offset: 오프셋, 데이터 몇 개를 건너뛸 것인지 나타냄
  - limit: 데이터 개수를 제한
  - category: 필터를 적용할 카테고리

    - 예를 들어 category=FASHION이라는 파라미터가 있다면 카테고리가 FASHION인 상품만 조회 가능, 만약 category 파라미터가 없다면 카테고리에 대한 필터를 적용하지 않음

  - CreateProduct, PathProduct 스트럭트 정의 및 활용

    - name: 문자열, 1~60자 사이
    - description: 문자열
    - category: enum, 'FASHION', 'BEAUTY', 'SPORTS', 'ELECTRONICS', 'HOME_INTERIOR' 중 하나
    - price: 숫자, 0 이상
    - stock: 정수, 0 이상
    - PatchProduct는 CreateProduct의 일부

  - POST products, PATCH product API 적용
