import os

base = r"C:\Users\Subas\Documents\A extra project"

# Fix index.html - read current content up to the broken <script> tag and replace ending
with open(os.path.join(base, "index.html"), "r", encoding="utf-8") as f:
    content = f.read()

# Find the broken ending and fix it
broken_end = content.find("\n  <script>\n")
if broken_end == -1:
    broken_end = content.find("<script>")

if broken_end > 0:
    good_part = content[:broken_end]
    new_ending = """
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r160/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.2/dist/chart.umd.min.js"></script>
  <script src="js/portfolio.js"></script>
</body>
</html>"""
    fixed = good_part + new_ending
    with open(os.path.join(base, "index.html"), "w", encoding="utf-8") as f:
        f.write(fixed)
    print("index.html fixed, length:", len(fixed))
else:
    print("Could not find broken ending, content ends with:", content[-200:])
