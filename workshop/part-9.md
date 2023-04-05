# Part 9: Next Steps

## Congrats! 🎉

You now have a working full stack application that persists users to a database. Where you go from here is up to you. Here are some suggestions:

- Create more tables that relate to each other with [foriegn keys](https://www.cockroachlabs.com/docs/stable/create-table.html#create-a-table-with-a-foreign-key-constraint)
- Use an ORM to like [SQLAlchemy](https://www.sqlalchemy.org/) to manage andconnect to the database.
- Add more pages to the frontend

### A quick note about CORS

This Repl is configured to have FastAPI serve the built React Application files. You may choose to deploy the frontend and backend code separately. For example, you could deploy the frontend as a static site to [Netlify](https://www.netlify.com/with/react/) or [Vercel](https://vercel.com/guides/deploying-react-with-vercel) and keep the backend on Replit or deploy to [Render](https://render.com/docs/web-services).
For this to work, we have to set up [CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS) support on the server. If you look at `fabric-stack-workshop/backend/backend/main.py` you notice a list of `origins`.

```python
origins = ["http://localhost:3000", "localhost:3000"]
```

Once you deploy your frontend, you'll want to make sure to add the new origin to the list to prevent CORS errors from appearing in your browser's developer console.

| [Back](part-8.md) |
| ----------------- |
