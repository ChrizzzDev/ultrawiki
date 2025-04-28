# ULTRAWIKI 🚀

ULTRAWIKI is a fan-made ULTRAKILL wiki site _"dedicated to ULTRAKILL"_, providing detailed information on game levels, enemies, secrets, and other content. It is built with modern web technologies (see Tech Stack below) and aims to create an immersive, interactive experience for users. As a community-driven project, ULTRAWIKI is strictly non-commercial and has no official affiliation with the original ULTRAKILL developers.

## Features 🌟

- **Levels page** (finished): Complete listing of all ULTRAKILL levels, with information on challenges, secrets, and level-specific details.

- **Enemies page** (in progress): A categorized list of enemies from the game. Upcoming individual enemy pages will provide stats, behaviors, and lore.

- **Individual enemy pages** (planned): Future pages for each enemy containing in-depth descriptions and images.

- **Enemies by level**: Each level page will list the enemies that appear in that level for easy reference.

- **Secrets parsing**: Secret locations and rewards will be parsed and documented for each level.

- **P-Rank details**: Information on achieving Perfect Rank (P-Rank) scores in each level.

- **Challenges per level**: Details on any special objectives or challenges within each level.

- **Animated visual effects**: The site uses CSS and JS animations (glitch effects, scroll reveal, etc.) to give the UI a dynamic, high-tech feel.

ULTRAWIKI features dynamic animated effects such as glitch-style overlays and reveal-on-scroll transitions. These animations give the site a futuristic, immersive aesthetic that matches the ULTRAKILL theme. The example image above is a placeholder demonstrating the glitchy visual style used in ULTRAWIKI.

## Tech Stack 📚

- **SvelteKit**: The app framework (Svelte + server-side rendering).

- **Tailwind CSS** (v4): Utility-first CSS framework for styling.

- **Skeleton UI** (v3): A Svelte/Tailwind component library used for layouts and UI elements.

- **Iconify**: Icon library for scalable vector icons.

- **Kysely** (optional): A type-safe SQL query builder (included here for database integration if needed).

## Development 💻

To run ULTRAWIKI locally, ensure you have Node.js installed. The project uses pnpm, but you can also use npm or yarn. Then run:

```bash
git clone https://github.com/ChrizzzDev/ultrawiki.git
cd ultrawiki
pnpm install
pnpm run dev
```

Open the URL shown in the console (usually http://localhost:5173) in your browser to view the site.

## How to Contribute 🤝

I welcome contributions! Here's how you can help:

- **Suggest Content Improvements**: You can propose changes or addition to level data, enemy information, secrets, and more.
- **Database Access**: A read-only public database profile available for contributors. This allow you to query ULTRAWIKI's data structure and contents directly, ensuring consistency when proposing updates.
- **Database Structure**: An updated UML diagram _generated_ from the `schema.prisma` file, provided for easier understanding of the data and relationships.
- **Open Issues**: Check the [GitHub Issues](https://github.com/ChrizzzDev/ultrawiki/issues) page to see tasks you can help with.
- **Pull Requests**: Feel free to fork the repo, make your changes, and open a pull request!

When contributing, please follow the style and structure of the existing content to maintain site consistency.

## Public Database Access (Read-Only) 📖

As part of ULTRAWIKI's commitment to being community-driven and transparent, a **public read-only database** is available for developers and contributors who want to explore the data, suggest changes, or build tools.
Please **respect the connection limits** and **use the database responsibly**.

### Connection Info 🌐

| Item                     | Value                                                                           |
| ------------------------ | ------------------------------------------------------------------------------- |
| Host                     | `db.ultrawiki.net`                                                                |
| Port                     | `3306`                                                                          |
| Database                 | `ultrawiki_dev`                                                                 |
| Users                    | `Alpha`, `Bravo`, `Charlie`, `Delta`, ..., `Juliet`                             |
| Password                 | Provided individually for each user. **(Ask maintainers or check secure list)** |
| Permissions              | **READ-ONLY** (`SELECT` permission only)                                        |
| Max connections per user | 5                                                                               |

> **Tip**: If one user reaches its connection limit, simply try another available user.

### Firewall and Security Measuers 🔥

- Only port `3306` is open for MySQL traffic.
- The database user accounts are limited to `SELECT` statements (no `INSER`, `UPDATE`, `DELETE`, etc.).
- Each user is limited to 5 **simultaneous connections**.
- All database activity is **logged** for traceability.
- Misuse or abuse may result in IP bans or user account revocations.

### How to connect 🔗

You can use any **standard MySQL client** (such as DBeaver, MySQL Workbench, HeidiSQL, or even the command line).
Example using command line:

```bash
mysql -u <USER> -p <PASSWORD> -h db.ultrawiki.net -P 3306 -D ultrawiki_dev
```

It will prompt you for the password.

> **Note**: Replace `<USER>` and `<PASSWORD>` with the appropriate credentials.

**⚠ Credentials may change periodically for security reasons.**

You can get the latest credentials by contacting me via [Discord](https://discord.com/users/753158579053264907).

### Rules of use 🧹

- Use the database **only for reading data**.
- Do **not** attempt to brute-force or overload connections.
- Respect fair use policies: no scraping or hammering the database.
- Cache results locally whenever possible if you need a lot of data.

## Roadmap 📈

Here are the next planned features and improvements for ULTRAWIKI:

- **Individual Enemy Pages**: Create detailed pages for each enemy, including stats, behavor, and lore.
- **Automated Secret Parsing**: Implement a system to parse and document secret locations automatically.
- **P-Rank Strategy Guides**: Add guides and tips to help players achieve P-Rank on all levels.

## Notes 📝

**Fan-Made / No Affiliation**: ULTRAWIKI is created by fans and is not affiliated with the ULTRAKILL developers or publishers in any way.

**Non-Commercial**: The project is for educational and community use only and is not used for any commercial purpose.

## License 📜

ULTRAWIKI is licensed under the Apache-2.0 License. See the [LICENSE](LICENSE) file for details.

# Thank you for contributing to ULTRAWIKI!