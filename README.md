# Unity.ecom

## Setting up the application

**1. Clone the Repository:** 
  
  Open your terminal and navigate to the directory where you want to clone the project. Then run the following    
  command:
    
`git clone https://git@github.com:codespirit7/unity.ecom.git`


**2. Navigate to the Project Directory:**

  Move into the project directory using the `cd` command.

`cd repository`


**3. Install Dependencies:**

  Once you're inside the project directory, install the necessary dependencies. Typically, an Express project has a 
  
  package.json file containing the dependencies. Run:

`npm install`

**4. Setting up environment files in .env file**
     

     MONGO_URL = "mongodb+srv://<username>:<password>@cluster0.wvcngti.mongodb.net/?retryWrites=true&w=majority"
      
      JWT_SECRET = <your_secret_key>
     

**5. Start the server:**

  Start the Express server. The command to start the server is often specified in the scripts section of 
  
  the package.json file. It's commonly named something like "start". Run:

`npm run start`

**5. Access the server:**
  Once the server runs, you should be able to access it in your browser or using tools like cURL or Postman.


## Testing API

**API Endpoint**



**URL:** http://localhost:5000/api/auth/register

**Method:** POST

**Content Type:** application/json


  
**Request Body**
<pre>
  {
  "username": "test",
  "email": "test@gmail.com",
  "password": "test",
  "userType": "buyer"
}
  
</pre>




**URL:** http://localhost:5000/api/auth/login

**Method:** POST

**Content Type:** application/json


  
**Request Body**
<pre>
  {
  "email": "test@gmail.com",
  "password": "test"
  }
  
</pre>

  **Response Body**
  <pre>
  {
  "Token": "your jwt token"
  }
  
</pre>



## API for Buyers



**URL:** http://localhost:5000/api/buyer/list-of-sellers

**Method:** GET

**Authorization:** Bearer token

**Content Type:** application/json




**URL:** http://localhost:5000/api/buyer/seller-catalog/:seller_id

**Method:** GET

**Authorization:** Bearer token

**Content Type:** application/json


**URL:** http://localhost:5000/api/buyer/create-order/:seller_id

**Method:** POST

**Authorization:** Bearer token

**Content Type:** application/json

**Request Body**
<pre>
  {
  "items": [{
    "product_id": "product_id",
    "quantity": 2
  }]
}
  
</pre>


## API for Sellers.



**URL:** http://localhost:5000 /api/seller/create-catalog

**Method:** POST

**Authorization:** Bearer token

**Content Type:** application/json

**Request Body**
<pre>
 {
  "items": [
    {"name": "Zubaida Product 9", "price": "19.99"}
  ]
}
  
</pre>




**URL:** http://localhost:5000/api/seller/orders

**Method:** GET

**Authorization:** Bearer "<Your Token>"

**Content Type:** application/json




  
The response will return a token that can be used to authenticate both the seller and buyer for multiple API requests.


 ## Testing Guidelines

- **Send a GET Request:**
  - Use your preferred API testing tool (e.g., Postman, curl) to send a GET request to the provided URL: http://localhost:5000/api/questions.
  - Set the request method to GET.
  - Set the content type to application/json.
  - Include the sample request body in the request payload.

- **Review the Response:**
  - Examine the response received from the API.
  - Check for a successful status code (e.g., 200 OK).
  - Verify that the response body contains relevant information.

- **Validation:**
  - Validate that the response structure matches the expected format.
  - Ensure that the total marks and difficulty distribution are correctly processed.
  - If applicable, handle error responses gracefully.

- **Error Handling:**
  - Test error scenarios by sending invalid requests or omitting required parameters.
  - Verify that the API returns appropriate error codes and error messages.




