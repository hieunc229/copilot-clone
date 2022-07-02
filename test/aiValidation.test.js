"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../src/utils/extractors/utils");
require('jest');
test("AI Code Validation - Valid", () => {
    expect((0, utils_1.isCodeValid)("function test() { return 1; }")).toBe(true);
    expect((0, utils_1.isCodeValid)("function test() { return 1; }\nfunction test2() { return 1; }")).toBe(true);
});
test("AI Code Validation - Invalid", () => {
    expect((0, utils_1.isCodeValid)("thisisnotcode")).toBe(false);
});
const testCases = [['public int counter = 0;', true],
    ['Toast msg;', true],
    ['public int counter = 0;', true],
    ['ImageView img, img2, img3, img4, img5, img6, img7, img8, img9;', true],
    ['int o = 1;', true],
    ['List<Integer> winner = new ArrayList<>(9);', true],
    ['for(var i = 0; i < 10; i++) { }', true],
    [`#!/bin/bash
    while true
    do
        python3 --headless record_video.py
        sleep 10
    done`, true],
    ['.box { height: 10px }', true],
    [`import asyncio
    import time
    async def say_after(delay, what):
      await asyncio.sleep(delay)
      print(what)
    
    async def main():
      tasks = []
      words = ['hello', 'world']
      for word in words:
        tasks.append(say_after(1, word))
      for task in tasks:
        await task
    asyncio.run(main())`, true],
    ['app.xaml', false],
    ['StartupUri', false],
    ['App.xaml.cs', false],
    [`    Id         Value
    [1,3,4]    Furn
    [1,3,4]    Furn
    [1,7,9]    SYS
    [1,2,3]    YSU
    [1,3,4]    Furn
    [1,7,9]    SYS`, false],
    ['getActivity()', true],
    ['Fragment', false],
    [`class Constant {
    
        companion object {
    
            val loginData: String = "LoginData"
            val token: String = "token"
            //create the function of shared preference
            fun setPreference(context: Context): SharedPreferences {
                return context.getSharedPreferences("Table Data", Context.MODE_PRIVATE)
    
            }
        }
    }`, true],
    ['Numerical puzzles, the solution is implemented in python.', false],
    ['Each lowercase letter of the Latin alphabet is assigned a binary digit, starting with the lowest a - 0th, b - 1st, ... z - 25th.\n', false],
    ['To pronounce a letter, the bit corresponding to the letter in the special variable W is inverted into a new value W in decimal', false],
    ['system. Definition: inversion of bit j in number x - change of j-th', false],
    ['the digit of the number x in the binary system to the opposite (0 becomes 1,', false],
    ['1 becomes 0). Example: number 15 (1111) after bit 2 inversion', false],
    ['becomes equal to the number 11 (1011).\n', false],
    ['five', false],
    ['Let\'s take a closer look at the first example of input data:', false],
    ['Next comes the character i (8th digit), so W = 20 + 211 + 2**8 = 2305', false],
    ['In the second example, the sequence W is as follows:', false],
    ['After the first character a, the value W = 2**0 = 1\n', false],
    [`from math import log2
    
    n = int(input())
    el_list = list(map(int, input().split()))
    letter_dict = {
        0:'a', 1:'b', 2:'c', 3:'d', 4:'e', 5:'f', 6:'g', 7:'h',
        8:'i', 9:'j', 10:'k', 11:'l', 12:'m', 13:'n', 14:'o',
        15:'p', 16:'q', 17:'r', 18:'s', 19:'t', 20:'u', 21:'v',
        22:'w', 23:'x', 24:'y', 25:'z', 26:' ',
    }
    str_result = ''
    
    sum_letter = el_list[0]
    first_letter = int(log2(sum_letter))
    str_result += letter_dict[first_letter]
    
    for i in range(1, n):
        diff = el_list[i] - sum_letter
        num = int(log2(diff))
        str_result += letter_dict[num]
        sum_letter += 2**num
    
    print(str_result)`, true],
    [`def replace_x(function):
    f = lambda x: eval(function)
    return f`, true],
    [`def convert_y(y_coords):
    y_coords = 540 - y_coords
    return y_coords`, true],
    [`def convert_x(x_coordinate):
    x_coordinate = x_coordinate + 960
    return x_coordinate`, true],
    ['pygame.display.set_caption(\'Math Creative Work\')\n', true],
    [`(88, 102, 49)
    (0, 0, 552, 344)
    ('R', 'G', 'B')
    <ImagingCore object at 0x0000025C45276AF0>
    None`, false],
    [`-startup
    plugins/org.eclipse.equinox.launcher_1.5.700.v20200207-2156.jar
    --launcher.library
    plugins/org.eclipse.equinox.launcher.win32.win32.x86_64_1.1.1100.v20190907-0426
    -data
    @noDefault
    -vmargs
    -Xms40m
    -Xmx1024m
    -Declipse.p2.unsignedPolicy=allow`, false],
    [`cd examples
    python 1-2-3-proteins.py`, false],
    [`Traceback (most recent call last):
      File "/Users/Tom/Documents/300. MASTERS/MASTERS/THESIS/CODE/k-gnn/examples/1-2-3-proteins.py", line 18, in <module>
        from k_gnn import DataLoader, GraphConv, avg_pool
    ModuleNotFoundError: No module named 'k_gnn'
    `, false],
    [`print(type(sys.path))
    i = 1
    for path in sys.path:
    print(i)
    print(path)
    i += 1`, true],
    [`1
    /Users/Tom/Documents/300. MASTERS/MASTERS/THESIS/CODE/k-gnn/examples
    2
    /usr/local/anaconda3/envs/gnn-test-env/lib/python39.zip
    3
    /usr/local/anaconda3/envs/gnn-test-env/lib/python3.9
    4
    /usr/local/anaconda3/envs/gnn-test-env/lib/python3.9/lib-dynload
    5
    /usr/local/anaconda3/envs/gnn-test-env/lib/python3.9/site-packages`, false],
    ['/Users/Tom/Documents/300. MASTERS/MASTERS/THESIS/CODE/k-gnn/examples', false],
    [`var arr = [1,2,,3,,-3,null,,0,,undefined,4,,4,,5,,6,,,,];
    arr.filter(n => n)
    // [1, 2, 3, -3, 4, 4, 5, 6]
    arr.filter(Number) 
    // [1, 2, 3, -3, 4, 4, 5, 6]
    arr.filter(Boolean) 
    // [1, 2, 3, -3, 4, 4, 5, 6]`, true],
    [`['','1','2',3,,'4',,undefined,,,'5'].join('').split(''); 
    // output:  ["1","2","3","4","5"]`, true],
    ['foo.join("").split("")', true],
    ['arr.filter(e=>e)', true],
    ['Array.prototype', false],
    ['filter', false],
    ['null', false],
    ['undefined', false],
    ['var filtered = array.filter(Boolean);', true],
    ['["hello", 1, 100, " "]', true],
    ['arr = arr.filter(function(e){return e}); ', true],
    [`arr = ["hello",0,"",null,undefined,1,100,"]; 
    arr.filter(function(e){return e});`, true],
    ['[1, false, "", undefined, 2].filter(Boolean); // [1, 2]', true],
    ['arr = arr.filter(function() { return true; });', true],
    ['.filter', false],
    [`.overknop:after{
    content: "";
    background: #f1f1f1;
    display: block;
    position: absolute;
    padding-top: 300%;
    padding-left: 350%;
    margin-left: -20px !important;
    margin-top: -120%;
    opacity: 0;
    transition: all 0.8s;
    }`, true],
    [`.overknop:active:after{
        padding: 0;
        margin: 0;
        opacity: 1;
        transition: 0s;
    }`, true],
    [":root { font-size: 16px; font-family: 'Open Sans'; --text-primary: #b6b6b6; --text-secondary: #ececec; --bg-primary: #23232e; --bg-secondary: #141418; --transition-speed: 600ms; margin: 0; padding: 0; }", true],
    ['body::-webkit-scrollbar-thumb { background: #6649b8; }', true],
    ['const whoBtn = document.querySelector(".who")', true],
    ['const whoWhen = document.querySelector(".who-when")', true],
    ['<input type="checkbox" id="OP" name="calendario" value="OP">', true],
    [`$(document).ready(function() {
            $('input[type="checkbox"]').click(function() {
                var checkBox = document.getElementById("OP");
                var x = document.getElementsByClassName("fc-event-container");
                if (checkBox.checked === true){
                    x.style.visibility = "visible !important";
                }else{
                    x.style.visibility = "hidden !important";
                }
            })
        });`, true],
    [`$(document).ready(function() {
        $('#OP').change(function() {
            var x = document.getElementsByClassName("fc-event-container");
            if (this.checked){
                 x.style.visibility = "visible !important";
            }else{
                 x.style.visibility = "hidden !important";
            }
        })
    });`, true],
    ['<p data-letters="PB" data-color="#c0227a"></p>', true],
    ['css[data-letters]="PB"', true],
    ['I want to use multiple data attribute in single css. So is that possible.?', false],
    ['<p data-letters="PB" data-color="#c0227a"></p>', true],
    [`margin-left: -800px;
    padding-right: 460px;
    float: right;`, true],
    [`p.outdent:first-letter {
    font-family: ms mincho;
    font-size: 8em;
    line-height: 1;
    font-weight: normal;
    float: left;
    margin: -0.1em 0 0 -.55em;
    letter-spacing: 0.05em;
    }`, true],
    [`.myImage a img
    {
        border: 1px solid grey;
        padding: 3px;
    }
    .myImage a:hover img
    {
        border: 3px solid blue;
        padding: 1px;
    }`, true],
    ['<img src="" alt="" class="standard_border" onmouseover="this.className=\'hover_border\'" onmouseout="this.className=\'standard_border\'" />', true],
    ['<div class="myImage"><a href="" class="image"><img src="" alt=""/></a></div>', true],
    [`.myImage a img {
       border: none;
    }`, true],
    [`function checkOverflow(el)
    {
       var curOverflow = el.style.overflow;
       if ( !curOverflow || curOverflow === "visible" )
          el.style.overflow = "hidden";
       var isOverflowing = el.clientWidth < el.scrollWidth 
          || el.clientHeight < el.scrollHeight;
       el.style.overflow = curOverflow;
       return isOverflowing;
    }`, true],
    [`function checkOverflow(elem) {
        const elemWidth = elem.getBoundingClientRect().width
        const parentWidth = elem.parentElement.getBoundingClientRect().width
        return elemWidth > parentWidth
    }`, true],
    [`if ( $(".inner-element").prop('scrollHeight') > $(".inner-element").height() ) {
        console.log("element is overflowing");
    } else {
        console.log("element is not overflowing");
    }`, true],
    ['Note the wrapper of elHeader sets the width of elHeader.\n', false],
    ['The CSS of elHeader:', false],
    ['scroll-padding-top', false],
    [`Assuming this behavior cannot be changed, can some CSS property, e.g. from the Scroll Snap module, be used to make sure the heading text is visible when the page is accessed with the secondary fragment identifier #alternate (i.e. it yields the same optical result as #heading)?`, false],
    ['As I understand it, both scroll-padding-top and scroll-margin-top will add a distance at the top, but will thereby push the heading up.', false],
    [`console.warn
    \`new NativeEventEmitter()\` was called with a non-null argument without the required \`addListener\` method.

      at new NativeEventEmitter (node_modules/react-native/Libraries/EventEmitter/NativeEventEmitter.js:61:17)
      at Object.<anonymous> (node_modules/@react-native-mapbox-gl/maps/javascript/modules/location/locationManager.js:6:43)
      at Object.<anonymous> (node_modules/@react-native-mapbox-gl/maps/javascript/components/UserLocation.js:4:1)`, false],
    [`"jest": {
        "preset": "react-native",
        "globalSetup": "./__tests__/globalSetup.ts",
        "setupFilesAfterEnv": [
            "@react-native-mapbox-gl/maps/setup-jest",
            "./__tests__/setup.ts"
        ],
        "setupFiles": [
            "./node_modules/react-native-gesture-handler/jestSetup.js",
            "./__tests__/mocks.tsx"
        ],
        "moduleFileExtensions": [
            "ts",
            "tsx",
            "js"
        ],
        "testMatch": [
            "**/?(*.)+(spec|test).(js|ts|tsx)"
        ],
        "modulePaths": [
            "<rootDir>"
        ],
        "transformIgnorePatterns": [
            "node_modules/(?!(@react-native-community|@react-native|react-native|redux-flipper|@invertase/react-native-apple-authentication))"
        ],
        "testPathIgnorePatterns": [
            "\\\\.snap$",
            "<rootDir>/node_modules/",
            "<rootDir>/app"
        ],
        "coveragePathIgnorePatterns": [
            "<rootDir>/node_modules/",
            "<rootDir>/__tests__/"
        ],
        "cacheDirectory": ".jest/cache"
    }`, true],
    [`#include <ESP8266WiFi.h>
    #include <FirebaseESP8266.h>`, true],
    [`img  = Image.open("file2.png")
    for slide in prs.slides:
            for shape in slide.shapes:
                if shape.has_text_frame:
                    if ("<graph1>" in shape.text):
                        print("1")
                        pic = slide.shapes.add_picture(img, 0, 0)
                        print("2")
    `, true],
    [`   image_part = self._package.get_or_add_image_part(image_file)
  File "C:\\Users\\Guigui\\AppData\\Local\\Packages\\PythonSoftwareFoundation.Python.3.9_qbz5n2kfra8p0\\LocalCache\\local-packages\\Python39\\site-packages\\pptx\\package.py", line 36, in get_or_add_image_part
    return self._image_parts.get_or_add_image_part(image_file)
  File "C:\\Users\\Guigui\\AppData\\Local\\Packages\\PythonSoftwareFoundation.Python.3.9_qbz5n2kfra8p0\\LocalCache\\local-packages    image = Image.from_file(image_file)
  File "C:\\Users\\Guigui\\AppData\\Local\\Packages\\PythonSoftwareFoundation.Python.3.9_qbz5n2kfra8p0\\LocalCache\\local-packages\\Python39\\site-packages\\pptx\\parts\\image.py", line 170, in from_file
    blob = image_file.read()
  File "C:\\Users\\Guigui\\AppData\\Local\\Packages\\PythonSoftwareFoundation.Python.3.9_qbz5n2kfra8p0\\LocalCache\\local-packages\\Python39\\site-packages\\PIL\\Image.py", line 519, in __getattr__
    raise AttributeError(name)
AttributeError: read`, false],
    ['import pyspark.pandas as pd \n' +
            'pd["date_col_2"] = pd["date_col_1"] - pd.DateOffset(months=5)', true],
    ['AttributeError: module \'pyspark.pandas\' has no attribute \'DateOffset\'\n', false],
    ['db.execute("SELECT ? FROM currency WHERE user_id = ?", ( "usd", 1).fetchall()', true],
    [`SET ANSI_NULLS ON
    GO
    SET QUOTED_IDENTIFIER ON
    GO
    ALTER FUNCTION [dbo].[ufn_FormatPhone] (@phone VARCHAR(32))
    RETURNS VARCHAR(32)
    AS
    BEGIN
        DECLARE @PhoneNumber CHAR(32)
    
        SET @PhoneNumber = @phone
    
        -- cleanse phone number string
        WHILE PATINDEX('%[^0-9]%', @phone) > 0
            SET @phone = REPLACE(@phone, SUBSTRING(@phone, PATINDEX('%[^0-9]%', @phone), 1), '')
    
        -- skip foreign phones
        IF (
                SUBSTRING(@phone, 1, 1) = '1'
                OR SUBSTRING(@phone, 1, 1) = '+'
                OR SUBSTRING(@phone, 1, 1) = '0'
                )
            AND LEN(@phone) > 11
            RETURN @phone
    
        -- build US standard phone number
        SET @phone = @phone
        SET @phone = SUBSTRING(@phone, 1, 3) + '-' + SUBSTRING(@phone, 4, 3) + '-' + SUBSTRING(@phone, 7, 4)
    
        IF LEN(@phone) - 10 > 1
            SET @phone = @phone + ' X' + SUBSTRING(@phone, 11, LEN(@phone) - 10)
    
        RETURN @phone
    END`, true],
    [`EXEC dbo.ufn_FormatPhone
    SELECT phone FROM [dbo].[Leader]`, true],
    [`Penalty from 
    2021 is *.02
    2020 is * .04
    2019 is * .06
    2015 - 2018 is *.08
    
    **Query:**
    
    $querz = $con->query(
    SELECT info.idno, info.owner, payment.year, info.value FROM Info
    INNER JOIN Payment
    ON Info.idno = Payment.idno
    
    );
    while($row = mysqli_fetch_array($querz)){
    $pdf->Row(Array(
    
    $row['info.idno'],
    $row['info.owner'],
    $row['year'],
    '2022',
    number_format($row['info.value'], 2, '.', ','),
    '',
    ''));
    }`, true],
    [`update files set content =
    (select file_content
     from FILE_HISTORY
     where file_id = id and 
     file_version_id = version_id - 1),
     version_id = version_id -1
     where version_id > 1;`, true],
    [`select * from files where id = 1;`, true],
    [`MERGE INTO ABC T
     USING XYZ S
     ON T.col1 = S.col2 
    AND T.col1 IN (select x from XYZ where x=1) 
    WHEN NOT MATCHED THEN INSERT ()
     VALUE()`, true],
    ['SELECT COUNT(CompanyID) FROM email_archive WHERE attachment = \'\'', true],
    ['SELECT COUNT(CompanyID) FROM email_archive', true],
    ['I have joined two tables via CompanyID to get the count of those attachment that have null and those that are not null. I have then calculated the percentage and to the result I have concatenated \'%\' string.', false]
];
test("Testing for 95% of tests to be valid", () => {
    let succeeded = 0;
    let failed = 0;
    for (let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];
        const result = (0, utils_1.isCodeValid)(testCase[0]);
        result == testCase[1] ? succeeded++ : failed++;
    }
    expect(succeeded).toBeGreaterThan(testCases.length * 0.95);
});
