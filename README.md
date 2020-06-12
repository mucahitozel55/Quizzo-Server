# Quizzo Server
> The backend for QUIZZO app. 

![[GitHub package.json version]](https://img.shields.io/github/package-json/v/ibtesam123/Quizzo-Server)
![[GitHub last commit]](https://img.shields.io/github/last-commit/ibtesam123/Quizzo-Server)
![[GitHub stars]](https://img.shields.io/github/stars/ibtesam123/quizzo-server?style=social)
![[GitHub forks]](https://img.shields.io/github/forks/ibtesam123/quizzo-server?style=social)


REST api made using Express.js and MongoDB as the database. Deployed on Heroku platform.

<!-- ![](header.png) -->

## Installation

1. Clone the project
2. Goto the cloned folder
3. Run command ```npm install```
4. Create ```.env``` file in the root folder and add your credentials as follows: 

    ```
        PORT=8080
        MONGO_URI= <YOUR MONGODB URI>
        WRITE_KEY= <ADD YOUR PREFERRED KEY FOR R/W ACCESS TO DATABASE>
    ```
5. Run ```npm run dev```

## Usage example

##### REST API Endpoints
    GET: 
        /question - Get 8 random questions
        /questions/categories - Get all current categories
        /user - Get a user by email or uid

    POST:
        /question - Add a question
        /question/batch - Add a batch of questions
        /user - Create a new user or return existing user
        /user/history - Add a new history to a specific user
        /user/historyBatch - Add history to a specific user in batch
        
    PUT:
        /user - Update a current user


## Deployment to Heroku

```sh
heroku create <Give a name of your choice>
git add .
git commit -m "Deploy to heroku"
git push heroku master
```

## Meta

Ibtesam Ansari – [LinkedIn](https://www.linkedin.com/in/ibtesamansari/) – ibtesamansari070@gmail.com

[https://github.com/ibtesam123](https://github.com/ibtesam123)

## Contributing

1. Fork it (<https://github.com/ibtesam123/quizzo-server/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -m 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request


## License

All the code available under the MIT license. See [LICENSE](LICENSE).

```sh
MIT License

Copyright (c) 2020 Ibtesam Shaukat Ansari

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```