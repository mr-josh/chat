import os

import httpx
from dotenv import load_dotenv
from twitchio.ext import commands
from twitchio.ext.commands import Context
from twitchio.message import Message

load_dotenv()


class MrChat(commands.Bot):
    def __init__(self):
        super().__init__(
            nick="MrChat",
            client_secret=os.environ["TWITCH_SECRET"],
            token=os.environ["TWITCH_TOKEN"],
            prefix="!",
            initial_channels=["dotmrjosh"],
        )

    async def event_ready(self):
        print("Bot is ready!")
        print("Logged in as: {}".format(self.nick))

    @commands.command()
    async def plinko(self, ctx: Context):
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"http://pocketbase.here/api/collections/plinko/records?filter=(user_id='{ctx.author.id}')"
            )

        total = response.json()["totalItems"]
        await ctx.channel.send(
            f"{ctx.author.name} has {total} plinko point{'s' if total > 1 else ''}!"
        )


if __name__ == "__main__":
    bot = MrChat()
    bot.run()
