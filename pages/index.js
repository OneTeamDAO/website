import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'

import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_KEY })

const databaseId = process.env.NOTION_DATABASE_ID

export default function Home({ allPostsData }) {

  const registerUser =  async event => {
    event.preventDefault() 

    try {
      const response = await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
          title: { 
            title:[
              {
                "text": {
                  "content": event.target.email.value
                }
              }
            ]
          }
        },
      })
      console.log(response)
      alert("Subscribed :)")
    } catch (error) {
      console.error(error.body)
      return (
        alert("failed to subscribe: "+ error.body)
      );
  
    }
  
  }

  return (
    <Layout home>
      <section className={utilStyles.headingMd}>
        <Head>
          <title>{siteTitle}</title>
        </Head>

        <p>Building Next-Gen Organisation for Developers</p>
        <br/>
        <br/>


        <form onSubmit={registerUser}>
          <div class="row g-3">
            <div class="col-auto">
              <p>Subscribe for updates: </p>
            </div>
            <div class="col-auto">
              <input type="email" class="form-control"  autoComplete="name" id="email" placeholder="richard@piedpiper.com" required/>
            </div>
            <div class="col-auto">
              <button type="submit" class="btn btn-primary">Count me in</button>
            </div>

          </div>
        </form>

      </section>
      
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
