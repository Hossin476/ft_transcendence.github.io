 def decode(self, s: str) -> List[str]:
        list_value = s[:-1].split('\r\n\r\n')
        list_value.reverse()
        if list_value[0] == '0':
            return []
        return list_value[1:]

decode('hamza]r')     