# Armor piece class with name, cost, and value
class ArmorPiece:
    def __init__(self, name, cost, value):
        self.name = name
        self.cost = cost
        self.value = value
    def get(self):
        d = dict()
        d['name'] = self.name
        d['cost'] = self.cost
        d['value'] = self.value
        return d

# Array with Chest objects
chestArr = [ArmorPiece('Chest', 64, 23), ArmorPiece('Chest', 67, 22), ArmorPiece('Chest', 62, 21)]
# Array with Leggins objects
leggingsArr = [ArmorPiece('Leggings', 87, 22), ArmorPiece('Leggings', 78, 18), ArmorPiece('Leggings', 75, 15)]
# Array with Helmet objects
helmetArr = [ArmorPiece('Helmet', 90, 23), ArmorPiece('Helmet', 77, 24), ArmorPiece('Helmet', 68, 16)]
# Array with Boots objects
bootsArr = [ArmorPiece('Boots', 64, 18), ArmorPiece('Boots', 52, 14), ArmorPiece('Boots', 35, 7)]
# Array with extra pieces
extraArr = [ArmorPiece('Chest', 67, 22), ArmorPiece('Leggings', 78, 18), ArmorPiece('Helmet', 68, 16), ArmorPiece('Boots', 35, 7)]
# Array to hold an armor set
armorSet = []
# Array to hold all armor set combinations
result = []

# Generate an array of all armot set combinations.
for chest in chestArr:
    for leggings in leggingsArr:
        for helmet in helmetArr:
            for boots in bootsArr:
                for extra in extraArr:
                    # Add pieces to an armor set.
                    armorSet.append(chest.get())
                    armorSet.append(leggings.get())
                    armorSet.append(helmet.get())
                    armorSet.append(boots.get())
                    armorSet.append(extra.get())
                    # Add an armor set combination to an array
                    result.append(armorSet)
                    # Clear array for next armor set.
                    armorSet = []

# print(result)

# Filter function that returns armor sets under 300 crowns.
def underBudget(armorSet):
    sum = 0
    for armorPiece in armorSet:
        sum+=armorPiece['cost']
    if sum > 300:
        return False
    else:
        return True

underBudgetArr = filter(underBudget, result)
underBudgetArr = list(underBudgetArr)

# for i in underBudgetArr:
#     print(i)

def highestValue(armorSet):
    sum = 0
    for armorPiece in armorSet:
        sum+=armorPiece['value']
    return sum

# Sort the armor sets by value
underBudgetArr.sort(key = highestValue)
# The armor set with the highest value
idealSet = underBudgetArr[0]

print('The set with the highest possible total armor value is: ', idealSet)



















