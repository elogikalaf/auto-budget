# Open-Source solution to automate budgeting 


1. Clone the project using `git clone https://github.com/elogikalaf/auto-budget`
2. Run `npm i` command
3. Run `npm start` command

or 

docker pull elogikalaf/auto-budget
docker run -p 3000:3000 elogikalaf/auto-budget

# list of APIs supported
1. create -> POST /transactions {"content": <message>, "bank": <bank name>}
2. get -> GET /transactions
3. get sum -> GET /transactions/sum
4. get last month -> GET /transactions/month

# Currently only "Bank Mellat" is supported

# Future Goals 
1. Add more banks
2. Containerize
